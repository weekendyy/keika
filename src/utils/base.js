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
    if (!params.type) {
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
    if(!wx.getStorageSync('token')){
      that._refetch(params)
      return false
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
        if (startChar !== '2') {
          if (code === '500' && !noRefetch) {
            that._refetch(params)
          }
          if (Number(res.data.code) === 10) {
            TokenModel.goNot()
            return false
          }
          params.sCallback && params.sCallback(res.data)
        } else {
          if (Number(res.data.code) === 10) {
            TokenModel.goNot()
            return false
          }
          params.sCallback && params.sCallback(res.data)
        }
      },
      fail: function (err) {
        that._processError(err)
      }
    })
  }

  _processError (err) {
    console.log(err)
  }
  _refetch(param) {
    TokenModel.getTokenFromServer((token) => {
      this.request(param, true)
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
      cancelText: '取消',
      confirmText: '去授权',
      success: function (res) {
        if (res.cancel) {
          infofail && infofail()
        } else {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting['scope.userLocation']) {
                wx.getLocation({
                  type: 'wgs84',
                  success(res){
                    success && success(res)
                  }
                })
              }
            }
          })
        }
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
}

export default Base
