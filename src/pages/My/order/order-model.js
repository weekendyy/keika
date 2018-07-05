import Base from '../../../utils/base'

class order extends Base {
  constructor() {
    super()
    this.uploadImgAddress = this.baseRestUrl + 'v2/comment/add_comment_img'
  }
  /**
   *  查看指定订单详情
   * @param orderId 订单的ID
   * @param callback 订单的返回结果
   */
  getOrderInfoById(orderId, callback) {
    let param = {
      url: 'v2/order/pay_order_detail',
      data: {
        orderID: orderId
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   *  个人中心详情页的数据
   * @param orderId 订单ID
   * @param callback 订单的具体数据
   */
  getMyOrderInfoById(orderId, callback){
    let param = {
      url: 'v2/order/order_detail',
      data: {
        orderID: orderId
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  /**
   *
   * @param orderNumber 订单编号ID
   * @param callback 获取结果 拉起 支付窗
   */
   
  execPay(queryData, callback) {
    let param = {
      url: 'v2/order/again_pay',
      data: {
        orderID: queryData.orderID,
        shipping_phone: queryData.shipping_phone,
        versions: 'vip5',
        shipping_street:queryData.shipping_street||'',
        shipping_area:queryData.shipping_area||'',
        shipping_city:queryData.shipping_city||'',
        shipping_province:queryData.shipping_province||'',
        shipping_name:queryData.shipping_name||'',
        shipping_tel:queryData.shipping_tel||''
      },
      sCallback(data) {
        callback && callback(data)
      }
    }
    this.request(param)
  }
  wxPay(data,callback){
    var timeStamp = data.timeStamp;
    if (timeStamp) { // 可以支付  根据时间戳来判断可以不可以支持
      wx.requestPayment({
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.package,
        'signType': data.signType,
        'paySign': data.paySign,
        success: function (resdata) {
          // 付款成功
          callback && callback(2);
        },
        fail: function (resdata) {
          // 关闭付款框
          callback && callback(1);
        }
      });
    }
  }
  /**
   *  个人中心订单列表展示信息
   * @param Postdata 需要传递进去 订单类型和订单的第一页的页码
   * @param callback 返回结果
   */
  getOrderList(Postdata, callback){
    let param = {
      url: 'v2/order/order_list',
      data: {
        pay_status: Postdata.type,
        limit_num: Postdata.limit_num || 1,
        magic_form_id: Postdata.magic_form_id || ''
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   *  获取指定 未使用 的 订单商品信息
   * @param orderID 订单的ID 获取支付以后 未使用的 订单商品数据
   * @param callback 未使用的订单部分数据
   */
  destory_goods(orderID,callback){
    let param = {
      url: 'v2/order/destory_goods',
      data:{
        orderID
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 核销订单
   * @param PostData JSON格式 用户输入密码 核销商品 订单ID
   * @param callback Code  0 失败 1 成功
   */
  destory_promotion(PostData, callback){
    let param = {
      url: 'v2/order/destory_promotion_merge1',
      data:{
        password: PostData.password,
        orderID: PostData.orderID,
        destroy_num: PostData.destroy_num
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 删除订单功能 用于
   * @param orderID 订单的订单ID
   * @param callback Code  0 失败 1 成功
   */
  del_order(orderID, callback){
    let param = {
      url: 'v2/order/del_order',
      data: {
        orderID
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   *  获取指定订单的评价信息
   * @param orderID 订单ID
   * @param callback 具体评价数据
   */
  comment_promotion(orderID, callback){
    let param = {
      url: 'v2/comment/comment_promotion',
      data: {
        orderID
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  /**
   *
   * @param PostData JSON格式 订单ID 图片数据格式
   * @param callback 0 和 1
   */
  add_comment_img(PostData, callback){
    let param = {
      url: 'v2/comment/add_comment_data',
      data: {
        orderID: PostData.orderID,
        img_arr: PostData.img_arr,
        content: PostData.content
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
}
const OrderModel = new order()
export default OrderModel
