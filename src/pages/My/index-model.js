import Base from '../../utils/base.js'
class My extends Base {
  constructor() {
    super()
  }
  // 得到用户信息
  getUserInfo(success, fail) {
    wx.getUserInfo(
      {
        lang: 'zh_CN',
        success: function (res) {
          success && success(res)
        },
        fail: function () {
          fail && fail()
        }
      }
    )
  }
  /* 用户拒绝以后,想办法重新获取授权 */
  _setUserinfo (success, infofail) {
    wx.showModal({
      title: '是否要打开设置页面重新授权',
      content: '需要获取您的公开信息(昵称、头像等),请到小程序的设置中打开用户信息授权',
      showCancel: false,
      confirmText: '去授权',
      success: function (res) {
        wx.openSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                lang: 'zh_CN',
                success: function (res) {
                  typeof success === 'function' && success(res)
                },
                fail: function () {
                  fail && fail()
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

  /**
   *  获取个人中心页面 有多少未指定的订单 和 是不是已经开通会员的标志
   * @param callback
   */
  getUserSpecialData(callback){
    let param = {
      url: 'v2/order/user_center',
      data: {
        versions: 'vip3'
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 添加用户信息到服务器
   * @param postdata 用户名 用户头像 用户地址
   * @param callback code 1 0
   */
  postUserInfo(postdata, callback) {
    let param = {
      url: 'v1/token/update_wechat_info',
      type: 'post',
      data: postdata,
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 获取个人中心的福利
   */
  getOrderDataList(queryData,callback){
    let param = {
      url: 'v5/magic_order/magic_order_list',
      data: {
        order_status: queryData.order_status,
        page_num: queryData.page_num || 1,
        magic_form_id: queryData.magic_form_id || ''
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 核销页面数据
   * @param queryData
   * @param callback
   */
  orderCancel(queryData,callback){
    let param = {
      url: 'v5/magic_order/magic_order_cancel',
      data: {
        order_id: queryData.order_id,
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 核销密码
   */
  destory_promotion(queryData,callback){
    let param = {
      url: 'v5/magic_order/magic_order_use',
      data: {
        password: queryData.password,
        order_id: queryData.order_id,
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 有没有开通会员
   * @param callback
   * @constructor
   */
  IS_VIP(callback){
    let param = {
      url: 'v5/magic_card/supplier_center_index',
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 文章详情
   */
  getDetail(queryData, callback) {
    let param = {
      url: 'v5/magic_card/rule_detail',
      data: {
        rule_id: queryData.rule_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 登录
  login(queryData, callback){
    let param = {
      url: 'v13/distribut_user/login',
      data: {
        phone: queryData.phone,
        password: queryData.password
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
}
const MyModel = new My()
export default MyModel
