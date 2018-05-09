import Base from '../utils/base.js'
class lotteryDraw extends Base {
  constructor() {
    super()
  }
  // 首页抽奖列表
  getLotteryList(queryData, callback) {
    let param = {
      url: 'v8/reward_goods/reward_goods_list',
      data: {
        page_num: queryData.pageNum
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 抽奖详情
  getLotteryDetail(queryData, callback){
    let param = {
      url: 'v8/reward_goods/reward_goods_detail',
      data: {
        goods_id: queryData.goods_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 报名接口
  joinTheLottery(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_order/join_reward',
      data: {
        wechat_portrait: queryData.userPic,
        wechat_name: queryData.name,
        goods_id: queryData.goods_id,
        magic_form_id: queryData.magic_form_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    console.log(queryData.magic_form_id)
    this.request(param)
  }
  // 查看参加抽奖所有名单  
  getAlljoiners(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_order/reward_order_list',
      data: {
        goods_id: queryData.goodsId,
        page_num: queryData.pageNum
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
  // 添加收货地址
  postAddress(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_order/add_order_address',
      data: queryData,
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
  // 展示地址
  showAddress(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_order/order_address_detail',
      data: {
        goods_id: queryData.goodsId
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
  // 获取订单列表
  getLotteryOrder(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_order/reward_order_center',
      data: {
        order_type: queryData.type
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
  // 成为赞助商获取信息
  getSponsorInfo(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_apply/reward_apply_str',
      data: {
        
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
  //提交赞助商信息
  postSponsorInfo(queryData, callback,fcallBack){
    let param = {
      url: 'v8/reward_apply/reward_apply_data',
      data: {
        content: queryData.content,
        wechat_name: queryData.wechat_name,
        portrait_img: queryData.portrait_img
      },
      sCallback(ResData) {
        callback && callback(ResData)
      },
      fCallback(){
        fcallBack && fcallBack()
      }
    }
    this.request(param)
  }
}
const lotteryDrawModel = new lotteryDraw()
export default lotteryDrawModel
