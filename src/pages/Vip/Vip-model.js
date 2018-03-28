import Base from '../../utils/base.js'
class Vip extends Base {
  constructor() {
    super()
  }
  getVipType(query,callback){
    let param = {
      url: 'v5/magic_card/open_card_choose',
      data:query,
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   *  开通会员需要的参数
   * @param orderInfo
   * @param callback
   * @constructor
   */
  VipExecPay(orderInfo, callback) {
    let param = {
      url: 'v5/magic_card/add_magic_card',
      data: {
        time_type: orderInfo.time_type,
        card_id: orderInfo.card_id,
        versions: 'vip5'
      },
      sCallback(data) {
        callback && callback(data)
      }
    }
    this.request(param)
  }
  /**
   *  支付匡
   * @param data
   * @param callback
   */
  wxPay(data, callback) {
    let timeStamp = data.timeStamp
    if (timeStamp) { // 可以支付  根据时间戳来判断可以不可以支持
      wx.requestPayment({
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.package,
        'signType': "MD5",
        'paySign': data.paySign,
        success: function (resdata) {
          // 付款成功
          callback && callback(2);
        },
        fail: function (resdata) {
          // 关闭付款框
          callback && callback(1);
        }
      })
    }
  }

  /**
   * 激活码开通会员
   * @param queryData
   * @param callback
   */
  numOpen(queryData, callback) {
    let param = {
      url: 'v5/magic_card/activate_num_open',
      data: {
        activate_num: queryData.activate_num
      },
      sCallback(data) {
        callback && callback(data)
      }
    }
    this.request(param)
  }
}
const VipModel = new Vip()
export default VipModel
