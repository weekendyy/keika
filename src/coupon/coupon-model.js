import Base from '../utils/base.js'
class takeCoupon extends Base {
  constructor() {
    super()
  }
  // 领取优惠券页面加载数据
  getTakeCouponData(queryData, callback) {
    let param = {
      url: 'v9/preferential/preferential_detail',
      data: {
        into_type: queryData.into_type,
        admin_id: queryData.admin_id,
        goods_id: queryData.goods_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  //领取优惠券
  postCoupon(queryData, callback) {
    let param = {
      url: 'v9/preferential_order/get_goods',
      data: {
        into_type: queryData.into_type,
        admin_id: queryData.admin_id,
        goods_id: queryData.goods_id,
        wechat_name: queryData.userName,
        portrait_img: queryData.userImg
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    if(queryData.get_log_id){
      param.data.get_log_id = queryData.get_log_id
    }
    this.request(param)
  }
  // 优惠券主页
  getCouponData(queryData, callback) {
    let param = {
      url: 'v9/preferential_order/order_center',
      data: {
        magic_shop_id: queryData.magic_shop_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 优惠券详情
  getCouponDetail(queryData, callback) {
    let param = {
      url: 'v9/preferential_order/order_detail',
      data: {
        magic_shop_id: queryData.magic_shop_id,
        order_type: queryData.order_type
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 用户核销页面数据
  getVerificationData(queryData, callback) {
    let param = {
      url: 'v9/preferential_order/cancel_index',
      data: {
        magic_shop_id: queryData.magic_shop_id,
        get_log_id: queryData.get_log_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 用户密码核销
  postVerificationNumber(queryData, callback) {
    let param = {
      url: 'v9/preferential_order/cancel_password',
      data: {
        magic_shop_id: queryData.magic_shop_id,
        get_log_id: queryData.get_log_id,
        cancel_password: queryData.cancel_password
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 商家核销页面
  getVerificationBness(queryData, callback) {
    let param = {
      url: 'v9/preferential_order/cancel_qr_index',
      data: {
        magic_shop_id: queryData.magic_shop_id,
        user_id: queryData.user_id,
        get_log_id: queryData.get_log_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 商家核销确认
  comfirmVerification(queryData, callback) {
    let param = {
      url: 'v9/preferential_order/cancel_qr_use',
      data: {
        magic_shop_id: queryData.magic_shop_id,
        user_id: queryData.user_id,
        get_log_id: queryData.get_log_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 微信授权
  getBindWeChatData(queryData, callback) {
    let param = {
      url: 'v9/preferential_impower/binding_wechat',
      data: {
        magic_shop_id: queryData.magic_shop_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 确认取消授权
  comfirmAuthorize(queryData, callback){
    let param = {
      url: 'v9/preferential_impower/confirm_impower',
      data: {
        magic_shop_id: queryData.magic_shop_id,
        choose_type: queryData.choose_type
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 激活优惠券页面
  getActiveCouponData(queryData, callback) {
    let param = {
      url: 'v9/preferential_order/activate_index',
      data: {
        get_log_id: queryData.get_log_id,
        magic_shop_id: queryData.magic_shop_id,
        wechat_name: queryData.wechat_name,
        portrait_img: queryData.portrait_img
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 参与激活
  helpActiveCoupon(queryData, callback) {
    let param = {
      url: 'v9/preferential_order/join_activate',
      data: {
        magic_shop_id: queryData.magic_shop_id,
        get_log_id: queryData.get_log_id,
        wechat_name: queryData.wechat_name,
        portrait_img: queryData.portrait_img
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 个人中心列表
  getCouponListData(queryData, callback) {
    let param = {
      url: 'v9/preferential_order/show_order_shop',
      data: {
        page_num: queryData.pageNum
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
}
const couponModel = new takeCoupon()
export default couponModel
