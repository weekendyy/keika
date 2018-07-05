import Base from '../../utils/base.js'

class Details extends Base{
  constructor(){
    super()
    this.defaultImg = this.baseRestUrl+ '/images/wechat_portrait_img/default_portrait.jpg'
  }

  /**
   *
   * @param goods_id 商品的ID
   * @param callback 商品的详细数据
   */
  getGoodsDetails(query,callback){
    let param = {
      url:'v2/promotion/promotion_detail',
      data: {
        promotion_id: query.goods_id,
        version: 'vip3',
        magic_form_id: query.formId
      },
      sCallback: function (data) {
        callback && callback(data)
      }
    }
    this.request(param)
  }
  /**
   * 下订单
   * @param param  商品id
   * @param callback
   */
  delOrder(param, callback) {
    let allPrams = {
      url: 'v2/order/place',
      data: {
        type: 1,
        promotionID: param.id,
        buy_num: param.num,
        versions: 'vip5'
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(allPrams)
  }

  /**
   *
   * @param callback 获取商品详情下最新的商品
   */
  getMorePromotion(callback){
    let param = {
      url: 'v2/promotion/more_promotion',
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 获取指定商品的评价数据
   * @param promotionID 商品的ID
   * @param callback 评价的数据
   * @constructor
   */
  getEvaluateData(promotionID, callback) {
    let param = {
      url: 'v2/comment/show_data',
      data: {
        promotionID,
        versions: 'vip3'
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   *  指定评论点赞
   * @param commentID 评论表的ID
   * @param callback 1 成功 0 失败
   */
  PostEvaluateLike(commentID, callback){
    let param = {
      url: 'v2/comment/add_like_count',
      data: {
        commentID,
        version: 'vip3'
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   *  商品详情页生成 海报
   * @param PostData 商品ID 用户名称 用户头像
   * @param callback 图片地址保存到本地
   */
  createPoster(PostData, callback,fcallback){
    let param = {
      url: 'v2/poster/create_poster',
      data:{
        promotionID: PostData.promotionID,
        wechat_name: PostData.wechat_name,
        wechat_portrait: PostData.wechat_portrait,
        versions: 'vip5'
      },
      sCallback(resData) {
        callback && callback(resData)
      },
      fCallback(resData) {
        fcallback && fcallback(resData)
      }
    }
    this.request(param)
  }
  getIndexNowActivity(query,callback){
    let param = {
      url: 'v5/magic_goods_list/promotion_goods_list',
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
      url: 'v5/magic_goods_list/promotion_goods_list',
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
  //预约活动
  orderTime(query,callback){
    let param = {
      url: 'v2/promotion/order_time',
      data: {
        goods_id: query.goodId
      },
      sCallback: function(data) {
        callback && callback(data)
      }
    }
    this.request(param)
  }
}
const DetailsModel = new Details()
export default DetailsModel
