import Base from '../../utils/base.js'
class Card extends Base {
  constructor () {
    super()
  }

  /**
   * 集字活动详情
   * @param queryData
   * @param callback
   */
  getDetail(queryData, callback) {
    if (!queryData.employer_user_id) {
      queryData.employer_user_id = ''
    }
    if (!queryData.add_type) {
      queryData.add_type = '1'
    }
    let param = {
      url: 'v6/lucky_new_goods/get_lucky_detail',
      data: queryData,
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 手动抽奖获取集字
   * @param queryData
   * @param callback
   */
  getLuckDraw(queryData, callback) {
    let param = {
      url: 'v6/lucky_new_goods/raffle',
      data: {
        lucky_goods_id: queryData.lucky_goods_id,
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
      url: 'v6/lucky_goods/exchange_goods',
      data: {
        lucky_goods_id: queryData.lucky_goods_id,
        phone_number: queryData.phone_number
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 订单详情
   * @param queryData
   * @param callback
   */
  orderDetails(queryData, callback) {
    let param = {
      url: 'v6/lucky_order/lucky_order_detail',
      data: {
        order_id: queryData.order_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 删除集字订单
   * @param queryData
   * @param callback
   */
  delOrder(queryData, callback) {
    let param = {
      url: 'v6/lucky_order/lucky_order_del',
      data: {
        order_id: queryData.order_id
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
      url: 'v6/lucky_order/end_cancel',
      data: {
        order_id: queryData.order_id,
        cancel_password: queryData.cancel_password
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
  luckyOrderCancel(queryData, callback) {
    let param = {
      url: 'v6/lucky_order/lucky_order_cancel',
      data: {
        order_id: queryData.order_id
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
      url: 'v5/magic_goods_list/lucky_goods_list',
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
      url: 'v5/magic_goods_list/lucky_goods_list',
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
const CardModel = new Card()
export default CardModel
