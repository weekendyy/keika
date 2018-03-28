import Base from '../../utils/base.js'
class Bargain extends Base {
  constructor(){
    super()
  }

  /**
   *  获取首页活动信息
   * @param callback
   */
  getIndexData(queryData, callback){
    if(!queryData.event){
      queryData.event = ''
    }
    let param = {
      url: "v7/bargain/list",
      data: {
        event:queryData.event
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   *  获取活动详情
   * @param queryData
   * @param callback
   */
  getLuckyDetail(queryData,callback){
    if(!queryData.launch_id){
      queryData.launch_id = ''
    }
    let param = {
      url: "v7/bargain/detail",
      data: queryData,
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 获取详情页排行榜
   * @param queryData
   * @param callback
   */
  getBargainLoad(queryData,callback){
    let param = {
      url: "v7/bargain/load",
      data: {
        activity_id:queryData.activity_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  /**
   *  获取版权信息
   * @param queryData
   * @param callback
   */
  getSupportData(callback){
    let param = {
      url: "v7/bargain/cooperation",
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 转发成功以后
   * @param queryData
   * @param callback
   */
  transmit_num(queryData, callback){
    let param = {
      url: "v7/bargain/forward",
      data: {
        activity_id: queryData.activity_id,
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 去兑换
   * @param queryData
   * @param callback
   */
  exchange_goods(queryData, callback){
    let param = {
      url: "v7/bargain/receive",
      data: {
        launch_id: queryData.launch_id,
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 手动砍价
   * @param queryData
   * @param callback
   */
  bargainDetail(queryData, callback){
    let param = {
      url: "v7/bargain/detail",
      data: {
        launch_id: queryData.launch_id,
        activity_id: queryData.activity_id,
        type: "event",
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 转发以后参加报名
   */
  bargainLaunch(queryData, callback){
    let param = {
      url: "v7/bargain/launch",
      data: {
        activity_id: queryData.activity_id,
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 获取信息
   */
  getMsg(callback){
    let param = {
      url: "v7/bargain/msg-config",
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   *  当砍到底价(不是0的时候) 去付款购买
   * @param queryData
   * @param callback
   */
  orderDetail(queryData, callback) {
    let param = {
      url: 'v7/bargain/detail_receive',
      data: {
        versions: 'vip5',
        launch_id: queryData.launch_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  /**
   *  请求支付
   * @param queryData
   * @param callback
   */
  execPay(queryData, callback) {
    Object.assign(queryData, {versions: 'vip5'})
    let param = {
      url: 'v7/bargain/pay_receive',
      data: queryData,
      sCallback(resData) {
        callback && callback(resData)
      }
    }
    this.request(param)
  }
  /**
   *  拉出支付框
   * @param data 支付参数
   * @param callback
   */
  wxPay(data, callback) {
    let timeStamp = data.timeStamp
    if (timeStamp) { // 可以支付  根据时间戳来判断可以不可以支持
      wx.requestPayment({
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.package,
        'signType': 'MD5',
        'paySign': data.paySign,
        success: function (resdata) {
          // 付款成功
          callback && callback(2)
        },
        fail: function (resdata) {
          // 关闭付款框
          callback && callback(1)
        }
      })
    }
  }

  /**
   * 订单详情
   * @param queryData
   * @param callback
   */
  getOrderDetail(queryData, callback) {
    let param = {
      url: 'v7/bargain/detail_order',
      data: {
        launch_id: queryData.launch_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  /**
   * 去兑换
   * @param queryData
   * @param callback
   */
  exchange_goods(queryData, callback) {
    let param = {
      url: "v7/bargain/receive",
      data: {
        launch_id: queryData.launch_id,
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 删除砍价订单
   * @param queryData
   * @param callback
   */
  delOrder(queryData, callback) {
    let param = {
      url: 'v7/bargain/del_launch',
      data: {
        launch_id: queryData.launch_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  /**
   * 获取核销页面数据
   * @param queryData
   * @param callback
   */
  luckyOrderCancel(queryData, callback){
    let param = {
      url: 'v7/bargain/use',
      data: {
        launch_id: queryData.launch_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  /**
   * 核销订单
   * @param queryData
   * @param callback
   */
  end_cancel(queryData, callback){
    let param = {
      url: 'v7/bargain/consumption',
      data: {
        launch_id: queryData.launch_id,
        password: queryData.password
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  //获取进行中的活动数据
  getIndexNowActivity(query,callback){
    let param = {
      url: 'v5/magic_goods_list/bargain_goods_list',
      data: {
        time_status:'1',
        page_num:query.PageNum || query || '1',
        magic_form_id:query.magic_formID || ''
      },
      sCallback: function(data) {
        callback && callback(data)
      }
    }
    this.request(param)
  }
  getIndexOldActivity(PageNum,callback){
    let param = {
      url: 'v5/magic_goods_list/bargain_goods_list',
      data: {
        time_status:'2',
        page_num:PageNum || '1',
      },
      sCallback: function(data) {
        callback && callback(data)
      }
    }
    this.request(param)
  }
}
const BargainModel = new Bargain()
export default BargainModel
