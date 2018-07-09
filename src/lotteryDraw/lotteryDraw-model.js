import Base from '../utils/base.js'
class lotteryDraw extends Base {
  constructor() {
    super()
  }
  // 首页抽奖列表
  getLotteryList(queryData, callback) {
    let param = {
      url: 'v8/reward_goods/reward_goods_list',
      data: {
        page_num: queryData.pageNum
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 抽奖详情
  getLotteryDetail(queryData, callback){
    let param = {
      url: 'v8/reward_goods/reward_goods_detail',
      data: {
        goods_id: queryData.goods_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 报名接口
  joinTheLottery(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_order/join_reward',
      data: {
        wechat_portrait: queryData.userPic,
        wechat_name: queryData.name,
        goods_id: queryData.goods_id,
        magic_form_id: queryData.magic_form_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    console.log(queryData.magic_form_id)
    this.request(param)
  }
  // 查看参加抽奖所有名单  
  getAlljoiners(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_order/reward_order_list',
      data: {
        goods_id: queryData.goodsId,
        page_num: queryData.pageNum
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
  // 添加收货地址
  postAddress(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_order/add_order_address',
      data: queryData,
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
  // 展示地址
  showAddress(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_order/order_address_detail',
      data: {
        goods_id: queryData.goodsId
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
  // 获取订单列表
  getLotteryOrder(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_order/reward_order_center',
      data: {
        order_type: queryData.type
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
  // 成为赞助商获取信息
  getSponsorInfo(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_apply/reward_apply_str',
      data: {
        
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
  //提交赞助商信息
  postSponsorInfo(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_apply/reward_apply_data',
      data: {
        content: queryData.content,
        wechat_name: queryData.wechat_name,
        portrait_img: queryData.portrait_img
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
  // 获取海报数据
  getPosterData(queryData, callback){
    let param = {
      url: 'v2/poster/get_data_poster',
      data: {
        id: queryData.id,
        type: 8
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
  // 生成海报
  buildPoster(that, canvasId, goodsName, lotteryZanzu, lotteryTime, goodsId,resData){
    const posterWdith = 195
    const poserHeight = 300
    const ctx = wx.createCanvasContext(canvasId)
    wx.downloadFile({
      url: 'https://api.czsjcrm.cn/images/poster/big_img/reward_backgroud.jpg',
      success: function (res) {
        let lotteryBgp = res.tempFilePath
        wx.downloadFile({
          url: resData.data.banner,
          success: function(res2){
            let goodsPic = res2.tempFilePath
            wx.downloadFile({
              url: resData.data.qr_code_img,
              success: function(res3){
                let QrPic = res3.tempFilePath
                // 绘制背景图
                ctx.drawImage(lotteryBgp, 0, 0, posterWdith, poserHeight)
                // 绘制产品图
                ctx.drawImage(goodsPic, 0.08*posterWdith, 0.34*posterWdith, 0.26*posterWdith, 0.26*posterWdith)
                // 绘制二维码图
                ctx.drawImage(QrPic, 0.35*posterWdith, 0.8*posterWdith, 0.3*posterWdith, 0.3*posterWdith)
                // 绘制标题
                ctx.setFillStyle('black')
                ctx.setFontSize(parseInt(posterWdith*0.05))
                let metrics = goodsName.length
                if(metrics>11){
                  ctx.fillText(goodsName.slice(0,11), 0.4*posterWdith, 0.38*posterWdith,0.8*posterWdith)
                  if(metrics>22){
                    ctx.fillText(goodsName.slice(11,21)+'...', 0.4*posterWdith, 0.44*posterWdith,0.8*posterWdith)
                  } else{
                    ctx.fillText(goodsName.slice(11), 0.4*posterWdith, 0.44*posterWdith,0.8*posterWdith)
                  }
                }else{
                  ctx.fillText(goodsName.slice(0,11), 0.4*posterWdith, 0.40*posterWdith,0.8*posterWdith)
                }
                // 绘制赞助商
                ctx.setFontSize(parseInt(posterWdith*0.04))
                ctx.setFillStyle('#888888')
                ctx.fillText(lotteryZanzu+' 赞助', 0.4*posterWdith, 0.51*posterWdith,0.8*posterWdith)
                // 绘制开奖日期
                ctx.fillText(lotteryTime, 0.4*posterWdith, 0.57*posterWdith,0.8*posterWdith)
                // 绘制小程序名称
                ctx.setFillStyle('#ffffff')
                ctx.setTextAlign('center')
                ctx.fillText(resData.data.top_name.magic_top_title, 0.5*posterWdith, 1.46*posterWdith,0.8*posterWdith)
                ctx.draw(true)
                wx.hideLoading()
                setTimeout(()=>{
                  wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: that.$parent.globalData.pxRadio*650,
                    height: that.$parent.globalData.pxRadio*1000,
                    destWidth: 650,
                    destHeight: 1000,
                    canvasId: canvasId,
                    fileType: 'jpg',
                    quality: 1,
                    success: (res)=> {
                      wx.setStorageSync('posterPic_'+canvasId+'_'+goodsId, res.tempFilePath)
                      that.posterImg = res.tempFilePath
                      that.showPosterBox = true
                      that.$apply()
                    },
                    fail: (res)=>{
                      console.log(res)
                    }
                  })
                },300)
              }
            })
          }
        })
      }
    })
  }
  // 保存海报
  savePoste(that,canvasId,postPicId){
    wx.showLoading({title:'保存中...'})
    let posterPic =  wx.getStorageSync('posterPic_'+canvasId+'_'+postPicId)
    wx.saveImageToPhotosAlbum({
      filePath: posterPic,
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
  // 核销
  cancle(queryData, callback){
    let param = {
      url: 'v8/reward_order/destroy_reward_order',
      data: {
       password: queryData.password,
       order_id: queryData.orderId
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
}
const lotteryDrawModel = new lotteryDraw()
export default lotteryDrawModel
