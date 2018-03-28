import Base from '../../../utils/base'
class Groups extends Base{
  constructor(){
    super()
    this.defaultImg = this.baseRestUrl+ '/images/wechat_portrait_img/default_portrait.jpg'
    this.uploadImgAddress = this.baseRestUrl + 'v2/comment/add_comment_img'
  }

  /**
   *  获取拼团轮播数据
   * @param callback 返回 拼团banner数据
   */
  getGroupsBanner(callback){
    let param = {
      url: 'v4/group_banner/group_banner_data',
      data: {
        banner_type: 2,
      },
      sCallback(data) {
        callback && callback(data)
      },
    }
    this.request(param)
  }

  /**
   *  获取首页开团中的数据
   * @param queryData 分页页码
   * @param callback  当前分页的数据
   */
  getGroupsGoodsList(queryData,callback){
    let param = {
      url: 'v4/group_goods_list/group_list_data',
      data: {
        page_num: queryData.pageNum
      },
      sCallback(data) {
        callback && callback(data)
      },
    }
    this.request(param)
  }

  /**
   *  获取商品详情数据
   * @param queryData 商品ID
   * @param callback
   */
  getGroupsGoodsDetail(queryData,callback){
    let param = {
      url: 'v4/group_goods_list/group_detail_data',
      data: {
        group_goods_id: queryData.goodId
      },
      sCallback(data){
        callback && callback(data)
      },
    }
    this.request(param)
  }

  /**
   *  获取指定商品下的评价
   * @param queryData 商品ID
   * @param callback
   */
  getEvaluateData(queryData, callback){
    let param = {
      url: 'v4/group_comment/show_data',
      data: {
        group_goods_id: queryData,
        version3: 'vip5'
      },
      sCallback(data){
        callback && callback(data)
      },
    }
    this.request(param)
  }

  /**
   *  拼团评论点赞
   * @param commentID 评论ID
   * @param callback code  and message
   * @constructor
   */
  PostEvaluateLike(group_comment_id, callback){
    let param = {
      url: 'v4/group_comment/add_like_count',
      data: {
        group_comment_id
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   *  猜你喜欢
   * @param callback 返回拼团活动详情下的 猜你喜欢
   */
  getGroupsGoodsLike(callback){
    let param = {
      url: 'v4/group_goods_list/group_guess_like',
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
  createPoster(PostData, callback){
    let param = {
      url: 'v4/group_poster/create_poster',
      data:{
        group_goods_id: PostData.promotionID,
        wechat_name: PostData.wechat_name,
        wechat_portrait: PostData.wechat_portrait,
        versions: 'vip5'
      },
      sCallback(resData) {
        callback && callback(resData)
      }
    }
    this.request(param)
  }

  /**
   * 获取当前商品开团中的信息
   * @param queryData 商品ID 和 开团状态(开团中/开团成的)
   * @param callback
   */
  getGroupMonad(queryData,callback){
    let param = {
      url: 'v4/group_goods_list/group_monad_data',
      data: {
        group_goods_id: queryData.group_goods_id,
        time_status: queryData.time_status,
        magic_formID: queryData.formID
      },
      sCallback(resData){
        callback && callback(resData)
      },
    }
    this.request(param)
  }

  /**
   *  拼团生成订单
   * @param queryData 订单类型(拼团/单独购买) 商品ID  有没有团ID
   * @param callback
   */
  createGroupsPlace(queryData,callback) {
    if(!queryData.group_monad_id){
      queryData.group_monad_id = ''
    }
    Object.assign(queryData, {versions:'vip5'})
    let param = {
      url: 'v4/group_order/group_place',
      data: queryData,
      sCallback(resData){
        callback && callback(resData)
      },
    }
    this.request(param)
  }

  /**
   *
   * @param queryData 订单号 订单类型
   * @param callback
   */
  getGropusOrderDetail(queryData,callback){
    let param = {
      url: 'v4/group_order/pay_order_detail',
      data: {
        orderID: queryData.orderID,
        pay_type: queryData.pay_type,
      },
      sCallback(resData){
        callback && callback(resData)
      },
    }
    this.request(param)
  }

  /**
   *  请求支付
   * @param queryData
   * @param callback
   */
  groupExecPay(queryData,callback){
    Object.assign(queryData, {versions: 'vip3'})
    let param = {
      url: 'v4/group_order/again_pay',
      data: queryData,
      sCallback(resData){
        callback && callback(resData)
      },
    }
    this.request(param)
  }

  /**
   *  拉出支付框
   * @param data 支付参数
   * @param callback
   */
  wxPay(data,callback){
    let timeStamp = data.timeStamp;
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
      });
    }
  }

  /**
   *  获取拼团支付成功以后的,分享页面数据
   * @param queryData 订单ID
   * @param callback
   */
  getGroupSuccessShare(queryData,callback){
    let param = {
      url: 'v4/group_monad/group_monad_data_info',
      data: {
        orderID: queryData.orderID
      },
      sCallback(resData){
        callback && callback(resData)
      },
    }
    this.request(param)
  }

  /**
   *  删除拼团失败和成功的订单
   * @param queryData 订单ID
   * @param callback
   */
  delGroupsOrder(queryData,callback){
    let param = {
      url: 'v4/group_order/del_order',
      data: {
        orderID: queryData.orderID
      },
      sCallback(resData){
        callback && callback(resData)
      },
    }
    this.request(param)
  }

  /**
   *  获取拼团 评价详情
   * @param queryData 订单ID
   * @param callback
   */
  getGroupsOrderComment(queryData,callback){
    let param = {
      url: 'v4/group_comment/comment_group_goods',
      data: {
        orderID: queryData.orderID
      },
      sCallback(resData){
        callback && callback(resData)
      },
    }
    this.request(param)
  }

  /**
   *  获取 拼团核销页面数据
   * @param queryData 拼团订单ID
   * @param callBack
   */
  getGroupsOrderDestory(queryData,callback){
    let param = {
      url: 'v4/group_order/destory_goods',
      data: {
        orderID: queryData.orderID
      },
      sCallback(resData){
        callback && callback(resData)
      },
    }
    this.request(param)
  }

  /**
   *  核销 拼团ID
   * @param queryData 拼团订单ID 和 拼团核销密码
   * @param callBack
   */
  destory_promotion(queryData, callback){
    let param = {
      url: 'v4/group_order/destory_group_id_merge',
      data: {
        orderID: queryData.orderID,
        password: queryData.password,
      },
      sCallback(resData){
        callback && callback(resData)
      },
    }
    this.request(param)
  }
  postGroupsOrderCommentData(queryData,callback){
    let param = {
      url: 'v4/group_comment/add_group_comment_data',
      data: {
        orderID: queryData.orderID,
        img_arr: queryData.img_arr,
        content: queryData.content
      },
      sCallback(resData){
        callback && callback(resData)
      },
    }
    this.request(param)
  }
  //获取进行中的活动数据
  getIndexNowActivity(query,callback){
    let param = {
      url: 'v5/magic_goods_list/group_goods_list',
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
      url: 'v5/magic_goods_list/group_goods_list',
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
const GroupsModel = new Groups()
export default GroupsModel
