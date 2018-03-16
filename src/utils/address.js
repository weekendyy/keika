import Base from './base'
class Address extends Base{
  constructor(){
    super()
  }

  /**
   * 获取微信地址
   * @param callback
   */
  getWxAddress(callback, fail){
    let that = this;
    wx.chooseAddress({
      success: function (res) {
        callback && callback(res)
      },
      fail: function(){
        fail && fail()
      }
    })
  }
  _setWxAddress(success, infofail){
    let that = this
    wx.showModal({
      title: '是否要打开设置页面重新授权',
      content: '需要获取您的微信收货地址,请到小程序的设置中打开用户地址授权',
      cancelText: '取消',
      confirmText: '去授权',
      success: function (res) {
        if (res.cancel) {
          infofail && infofail()
        } else {
          wx.openSetting({
            success: function (res) {
              if (res.authSetting['scope.address']) {
                wx.chooseAddress({
                  success: function (res) {
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
  /**
   * 添加和更新店铺地址
   * @param callback
   */
  postAddress(postData, callback){
    let param = {
      url: 'v2/user_address/add_user_address',
      data: postData,
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   *  获取个人收货地址
   * @param callback
   */
  getUserAddress(callback){
    let param = {
      url: 'v2/user_address/show_data',
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
}
const AddressModel = new Address();
export default AddressModel
