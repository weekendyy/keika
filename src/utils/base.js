import Config from './config.js'
import TokenModel from './token.js'
class Base {
  constructor() {
    this.baseRestUrl = Config.resUrl
    this.shopConfig = {
      shopID: Config.shopID,
    }
  }
  request(params, noRefetch) {
    let that = this, url = this.baseRestUrl + params.url
    if(params.type === 'get') {
      url += '?shopID='+ this.shopConfig.shopID
    }
    if (!params.type || params.type=="post") {
      params.type = 'post'
      if(params.data) {
        Object.assign(params.data, this.shopConfig)
      } else {
        params.data = this.shopConfig
      }
    }
    /* 不需要再次组装地址 */
    if (params.sign) {
      delete params.shopID
    }
    if (params.setUpUrl) {
      url = params.url
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token')
      },
      success: function(res) {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        let code = res.statusCode.toString()
        let startChar = code.charAt(0)
        if (startChar !== '2') {        //不正常访问 
          if(res.data.code == '401' && !noRefetch){  // token问题
            console.log('token无效')
            that._refetch(params)
          } else if(!noRefetch) {
            that._refetch(params)
            console.log(res)
            console.log(params)
          }
        } else {  // 正常访问
          params.sCallback && params.sCallback(res.data)
        }
      },
      fail: function (err) {
        that._processError(err,params)
        params.fCallback && params.fCallback()
      }
    })
  }

  _processError (err,params) {
    // let that = this
    // wx.showModal({
    //   title: '网络出错，请点击重试',
    //   success: function(res) {
    //     if (res.confirm) {
    //       that._refetch(params)
    //     } else if (res.cancel) {
    //       that._refetch(params)
    //     }
    //   }
    // })
    console.log(err)
  }
  _refetch(param) {
    TokenModel.getTokenFromServer((token) => {
      this.request(param, true)
    })
  }
  _toIndex(){
    wx.showModal({
      title: '访问超时',
      content: '点击返回首页',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/Index/index'
          })
        }
      }
    })
  }
  /* 获得元素上的绑定的值 */

  getDataSet (event, key) {
    return event.currentTarget.dataset[key]
  }
  calling(tel){
    wx.makePhoneCall({
      phoneNumber: tel
    })
  }

  /**
   *  获取 服务器上的VIP到期时间 和本地时间对比 看看有没有过期来判断要不要显示一些 开通模块
   * @param callback
   */
  getVipStateInfo(callback){
    let param = {
      url: 'v2/card/check_opend',
      sCallback(resData){
        callback && callback(resData)
      }
    }
    this.request(param)
  }
  getCityName(success, fail){
    wx.getLocation({
      type: 'wgs84',
      success(res){
        success && success(res)
      },
      fail: function (res){
        fail && fail()
      }
    })
  }
  twoGetCityName(success, infofail){
    wx.showModal({
      title: '是否要打开设置页面重新授权',
      content: '需要获取您的地理位置,请到小程序的设置中打开地理位置授权',
      showCancel: false,
      confirmText: '去授权',
      success: function (res) {
        wx.openSetting({
          success: (res) => {
            if (res.authSetting['scope.userLocation']) {
              wx.getLocation({
                type: 'wgs84',
                success(res){
                  success && success(res)
                }
              })
            } else{
              infofail && infofail()
            }
          }
        })
      }
    })
  }

  getCity(queryData, callback){
    let param = {
      url: 'v6/lucky_goods/check_area',
      data: {
        la : queryData.la,
        lng: queryData.lng,
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  //生成海报接口
  getPostData(query,callback,fcallback){
    let param = {
      url: 'v2/poster/get_data_poster',
      data: {
        id: query.id,
        type: query.type
      },
      sCallback: function(data) {
        callback && callback(data)
      },
      fCallback(resData) {
        fcallback && fcallback(resData)
      }
    }
    if(query.employer_user_id){
      param.data.employer_user_id = query.employer_user_id
    }
    this.request(param)
  }
  //生成海报接口1
  getPostData1(query,callback,fcallback){
    let param = {
      url: 'v5/wxdata/poster',
      data: {
        type: query.type,
        goods_id: query.id
      },
      sCallback: function(data) {
        callback && callback(data)
      },
      fCallback(resData) {
        fcallback && fcallback(resData)
      }
    }
    if(query.employer_user_id){
      param.data.employer_user_id = query.employer_user_id
    }
    this.request(param)
  }
  // 生成海报接口1
  creatPoster1(that,canvasId,resData,title,postPicId,userPic,userName,disQrcode){
    const posterWdith = 390
    const poserHeight = 694
    const ctx = wx.createCanvasContext(canvasId)
    let p1 = new Promise((resolve,reject)=>{
      wx.downloadFile({
        url: disQrcode?disQrcode:resData.qr_code_url,
        success: (res)=>{
          resolve(res.tempFilePath)
        }
      })
    })
    let p2 = new Promise((resolve,reject)=>{
      wx.downloadFile({
        url: resData.poster_img,
        success: (res)=>{
          resolve(res.tempFilePath)
        }
      })
    })
    let p3 = new Promise((resolve,reject)=>{
      wx.downloadFile({
        url: userPic,
        success: (res)=>{
          resolve(res.tempFilePath)
        }
      })
    })
    Promise.all([p1,p2,p3]).then((result)=>{
      let qrCodePic = result[0]
      let goodsPic = result[1]
      let userIcon = result[2]
      //绘制背景图
      ctx.drawImage('/images/posterbgp.png', 0, 0, posterWdith, poserHeight)
      ctx.drawImage(goodsPic, 0, 0, posterWdith, 1.22*posterWdith)
      ctx.drawImage(qrCodePic, 260, 565, 105, 105)
      ctx.drawImage(userIcon, 12, 562, 55, 55)
      ctx.setFontSize(parseInt(posterWdith*0.04))
      ctx.setTextAlign('left')
      ctx.fillText(userName, 80, 595)
      ctx.drawImage('/images/userpiccover.png', 12, 562, 55, 55)
      if(disQrcode){
        ctx.drawImage('/images/buybtndis.png', 15, 631, 190, 35)
      }else{
        ctx.drawImage('/images/buybtb.png', 15, 631, 190, 35)
      }
      // 绘制标题
      ctx.setFillStyle('black')
      ctx.setFontSize(parseInt(posterWdith*0.04))
      ctx.setTextAlign('center')
      let metrics = title.length
      if(metrics>16){
        ctx.fillText(title.slice(0,16), 0.5*posterWdith, 1.31*posterWdith,0.8*posterWdith)
        if(metrics>36){
          ctx.fillText(title.slice(16,32)+'...', 0.5*posterWdith, 1.37*posterWdith,0.8*posterWdith)
        } else{
          ctx.fillText(title.slice(16), 0.5*posterWdith, 1.37*posterWdith,0.8*posterWdith)
        }
      }else{
        ctx.fillText(title, 0.5*posterWdith, 1.34*posterWdith,0.8*posterWdith)
      }
      ctx.fillText('长按立即购买', 110, 1.68*posterWdith,0.8*posterWdith)
      if(resData.poster_img == 'https://api.czsjcrm.cn'){
        ctx.fillText('请往后台添加图片', 0.5*posterWdith, 0.8*posterWdith,0.8*posterWdith)
      }
      ctx.draw(true)
      wx.hideLoading()
      setTimeout(()=>{
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          destWidth: 1080,
          destHeight: 1920,
          canvasId: canvasId,
          fileType: 'jpg',
          quality: 1,
          success: (res)=> {
            wx.previewImage({
              urls: [res.tempFilePath], // 需要预览的图片http链接列表
              complete: (res)=>{
                console.log(res)
              }
            })
          },
          fail: (res)=>{
            console.log(res)
          }
        })
      },100)
    })
  }
  //保存海报
  savePoste(that,canvasId,postPicId){
    wx.showLoading({title:'保存中...'})
    let posterPic =  wx.getStorageSync('posterPic_'+canvasId+'_'+postPicId)
    wx.saveImageToPhotosAlbum({
      filePath: posterPic[0],
      success:()=>{
        wx.showToast({
          title: '保存成功！',
          icon: 'success',
          duration: 1000
        })
        that.showPosterBox = false
        that.$apply()
      },
      fail:(e)=>{
        that.showPosterBox = false
        that.$apply()
        wx.showToast({
          title: '保存失败！',
          icon: 'success',
          duration: 1000
        })
      }
    })
  }
  //生成海报
  creatPoster(that,canvasId,resData,title,priceNow,pricePre,type,typeIcon,address,postPicId,disQRCode){
    const posterWdith = 195
    const poserHeight = 300
    const ctx = wx.createCanvasContext(canvasId)
    let p1 = new Promise((resolve,reject)=>{
      wx.downloadFile({
        url: disQRCode?disQRCode:resData.qr_code_img,
        success: (res)=>{
          resolve(res.tempFilePath)
        }
      })
    })
    let p2 = new Promise((resolve,reject)=>{
      wx.downloadFile({
        url: resData.blur_img,
        success: (res)=>{
          resolve(res.tempFilePath)
        }
      })
    })
    let p3 = new Promise((resolve,reject)=>{
      wx.downloadFile({
        url: resData.banner,
        success: (res)=>{
          resolve(res.tempFilePath)
        }
      })
    })
    Promise.all([p1,p2,p3]).then((result)=>{
      let qrCodePic = result[0]
      let blurPic = result[1]
      let mainPic = result[2]
      // 绘制背景色
      ctx.setFillStyle('white')
      ctx.fillRect(0, 0, posterWdith, poserHeight)
      //绘制背景图
      ctx.drawImage(blurPic, 0, 0, posterWdith, 200)
      ctx.beginPath()
      ctx.moveTo(0,poserHeight)
      ctx.lineTo(poserHeight,poserHeight)
      ctx.arc(0.5*posterWdith, -0.35*poserHeight, 1*posterWdith, 0, 1 * Math.PI)
      ctx.setFillStyle('white')
      ctx.fill()
      //原价删除线
      // ctx.setStrokeStyle('#A79E9F')
      // const metPrice = pricePre.length*posterWdith*0.03
      // ctx.moveTo((0.5*posterWdith)-(metPrice/2), 1*posterWdith)
      // ctx.lineTo((0.5*posterWdith)+(metPrice/2), 1*posterWdith)
      // ctx.stroke()
      // 绘制图片
      ctx.drawImage(mainPic, 0.05*posterWdith, 0.1*posterWdith, 0.9*posterWdith, 0.55*posterWdith)
      // 绘制中间内容，矩形
      ctx.setShadow(0, 5, 10, '#E5E5E5')
      ctx.setFillStyle('white')
      ctx.fillRect(0.05*posterWdith, 0.65*posterWdith, 0.9*posterWdith, 0.4*posterWdith)
      //绘制标题
      ctx.setFillStyle('black')
      ctx.setShadow(0, 0, 0, 'white')
      ctx.setFontSize(parseInt(posterWdith*0.05))

      ctx.setTextAlign('center')
      let shopName =  resData.shop_name?('【'+resData.shop_name+'】'):''
      let posterTitle = shopName + title
      let metrics = posterTitle.length
      if(metrics>16){
        ctx.fillText(posterTitle.slice(0,16), 0.5*posterWdith, 0.75*posterWdith,0.8*posterWdith)
        if(metrics>36){
          ctx.fillText(posterTitle.slice(16,32)+'...', 0.5*posterWdith, 0.82*posterWdith,0.8*posterWdith)
        } else{
          ctx.fillText(posterTitle.slice(16), 0.5*posterWdith, 0.82*posterWdith,0.8*posterWdith)
        }
      }else{
        ctx.fillText(posterTitle, 0.5*posterWdith, 0.79*posterWdith,0.8*posterWdith)
      }
      //绘制价格--现价
      if(priceNow){
        ctx.setFillStyle('#FF373E')
        ctx.setFontSize(parseInt(posterWdith*0.06))
        ctx.fillText('¥'+priceNow, 0.5*posterWdith, 0.93*posterWdith)
      }
      //绘制专题的超值优惠
      if(type == '专题'){
        ctx.setFillStyle('#FF363D')
        ctx.setFontSize(parseInt(posterWdith*0.07))
        ctx.fillText('超值优惠', 0.5*posterWdith, 0.93*posterWdith)
      }
      //绘制价格--原价
      ctx.setFillStyle('#A79E9F')
      ctx.setFontSize(parseInt(posterWdith*0.045))
      ctx.setTextBaseline('middle')
      if(pricePre){
        ctx.fillText('¥'+pricePre, 0.5*posterWdith, 0.98*posterWdith)
      }
      //抢购图标
      if(type){
        ctx.drawImage(typeIcon, 0.7*posterWdith, 0.87*posterWdith, 0.14*posterWdith, 0.06*posterWdith)
        ctx.setFillStyle('white')
        ctx.setFontSize(parseInt(posterWdith*0.04))
        ctx.fillText(type, 0.76*posterWdith, 0.9*posterWdith)
      }
      //绘制小程序码
      ctx.drawImage(qrCodePic, 0.35*posterWdith, 1.11*posterWdith, 0.3*posterWdith, 0.3*posterWdith)
      //绘制扫码提示
      ctx.setFillStyle('#757575')
      ctx.setFontSize(parseInt(posterWdith*0.04))
      ctx.fillText("长按扫码发现惊喜", 0.5*posterWdith, 1.48*posterWdith)
      //绘制地址
      
      
      if(address){
        let addressL = address.length
        if(addressL>16){
          ctx.fillText('地址：' + address.slice(0,16), 0.5*posterWdith, 0.9*posterWdith,0.8*posterWdith)
          if(addressL>36){
            ctx.fillText(address.slice(16,32)+'...', 0.5*posterWdith, 0.95*posterWdith,0.8*posterWdith)
          } else{
            ctx.fillText(address.slice(16), 0.5*posterWdith, 0.95*posterWdith,0.8*posterWdith)
          }
        }else{
          ctx.fillText('地址：'+address, 0.5*posterWdith, 0.9*posterWdith,0.8*posterWdith)
        }
        ctx.setFontSize(parseInt(posterWdith*0.05))
      }

      ctx.draw(true)
      wx.hideLoading()
      setTimeout(()=>{
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 650,
          height: 1000,
          destWidth: 650,
          destHeight: 1000,
          canvasId: canvasId,
          fileType: 'jpg',
          quality: 1,
          success: (res)=> {
            if(!disQRCode){
              wx.setStorageSync('posterPic_'+canvasId+'_'+postPicId, [res.tempFilePath,priceNow,pricePre])
            }
            that.posterImg = res.tempFilePath
            that.showPosterBox = true
            that.posting = false
            that.$apply()
          },
          fail: (res)=>{
            console.log(res)
          }
        })
      },500)
    })
  }

  //验证手机号格式
  verifyPhoneNumber(phoneNumber){
    if(!phoneNumber || Number(phoneNumber.length) === 0){
      wx.showToast({
        title: '请输入手机号码',
        icon:'none',
        duration: 1000,
        mask: true,
      })
      return false
    }
    if(Number(phoneNumber.length) <= 10){
      wx.showToast({
        title: '手机长度不足',
        icon:'none',
        duration: 1000,
        mask: true,
      })
      return false
    }
    if(!(/^1[23456789]\d{9}$/.test(phoneNumber))){
      wx.showToast({
        title: '手机格式错误',
        icon:'none',
        duration: 1000,
        mask: true,
      })
      return false;
    }
    return true
  }
  //弹出提示信息
  showTips(tips){
    wx.showToast({
      title: tips,
      icon: 'none',
      duration: 1500
    })
  }
  //打电话
  makePhoneCall(phoneNumber){
    if(phoneNumber){
      wx.makePhoneCall({
        phoneNumber: phoneNumber
      })
    } else {
      wx.showToast({
        title: '未设置电话号码',
        icon: 'none',
        duration: 1500
      })
    }
  }
  //打开地图
  openMap(longitude,name,address){
    if(longitude && longitude.split(",").length == 2){
      let arr = longitude.split(",")
      let lat = arr[0]
      let lng = arr[1]
      wx.openLocation({
        latitude: Number(lat),
        longitude: Number(lng),
        scale: 18,
        name: name,
        address:address
      })
    } else{
      wx.showToast({
        title: '未设置地理坐标',
        icon: 'none',
        duration: 1500
      })
    }
  }
  // 修改上一个页面的某个状态
  setPrePageState(data,changeData){
    let prevPage = getCurrentPages()[getCurrentPages().length-2]
    prevPage.setData({
      [data]: changeData
    })
  }
  //小程序跳转
  navTo(url,query){
    if(url == '/pages/Index/index' || url == '/pages/Activity/index' || url == '/pages/Shop/shopIndex' || url == '/pages/My/index'){
      wx.switchTab({url:url})
    } else {
      wx.navigateTo({
        url: url + this._encode(query)
      })
    }
  }
  // 路径参数转换
  _encode(json){
    if (!json) {  
        return '';  
    }  
    var tmps = [];  
    for (var key in json) {  
        tmps.push(key + '=' + json[key]);  
    } 
    return '?' + tmps.join('&');
  }
  // 版本比较
  compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  }
  // 时间戳转成日期格式
  getLocalTime(nS) { 
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
  }
  // 验证是否获取过手机号
  hasPostPhoneNumber(callback){
    let param = {
      url: 'v5/wxdata/check_phone',
      data: {
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 换取手机号
  _getPhoneNumber(queryData, callback){
    let param = {
      url: 'v5/wxdata/get_phone',
      data: {
        iv: queryData.iv,
        encryptedData: queryData.encryptedData
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  getPhoneNumber(e,scallBack){
    if(e.detail.iv){
      let iv = encodeURIComponent(e.detail.iv)
      let encryptedData = e.detail.encryptedData
      let query = {
        iv: iv,
        encryptedData: encryptedData
      }
      this._getPhoneNumber(query,(res)=>{
        if(res.code == 1){
          scallBack && scallBack(res)
        }else{
          this.showTips('获取失败，请重试')
        }
      })
    }else{
      this.showTips('需要您的手机号才能继续使用')
    }
  }
}

export default Base
