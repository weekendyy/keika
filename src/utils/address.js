import Base from './base'
import MyModel from '../pages/My/index-model.js'
class Address extends Base{
  constructor(){
    super()
  }

  /**
   * 获取微信地址
   * @param callback
   */
  getWxAddress(callback, fail){
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
  //获取地理位置
  getGeoAndUserInfo(sCallBack){
    let Geography = wx.getStorageSync('GeographyData')
    if(!Geography){
      MyModel.getCityName((ResData)=>{
        wx.setStorage({
          key:"GeographyData",
          data: ResData
        })
        sCallBack && sCallBack()
      },()=>{
        MyModel.twoGetCityName((res)=>{
          wx.setStorage({
            key:"GeographyData",
            data: res
          })
          sCallBack && sCallBack()
        },(res)=>{
          wx.showToast({
            title: '无法获取您的位置信息',
            icon:'none',
            duration: 1500
          })
          sCallBack && sCallBack()
        })
      })
    } else {
      sCallBack && sCallBack()
    }
  }
  //获取用户信息并更新
  getUser(res,sCallBack){
    let userInfo = res.detail.userInfo
    if(userInfo){  //用户点了确定授权或者已经授权
      let value = wx.getStorageSync('userInfo')
      if(value){
        sCallBack && sCallBack()
        return false
      } else {
        sCallBack && sCallBack()
        let postdata = {
          wechat_name: userInfo.nickName,
          area: userInfo.country + userInfo.province + userInfo.city,
          portrait: userInfo.avatarUrl,
          encryptedData:res.detail.encryptedData,
          iv:res.detail.iv,
          versions: "vip5",
        }
        MyModel.postUserInfo(postdata,()=>{
          wx.setStorageSync('userInfo', userInfo)
        })
      }
    } else{
      wx.showToast({
        title: '需要获取您的用户信息才能使用该功能',
        icon: 'none',
        duration: 2000
      })
    }
  }
}
const AddressModel = new Address();
export default AddressModel
