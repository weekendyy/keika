import Base from '../utils/base.js'

class TimeLimitActivityDetail extends Base{
  constructor(){
    super()
  }

  /**
   *
   * @param goods_id 商品的ID
   * @param callback 商品的详细数据
   */
  getActivityData(queryData, callback) {
    let param = {
      url: 'v5/magic_shop/subject_shop_list',
      data: {
        subject_id: queryData.subject_id,
        page_num: queryData.page_num,
        lng:queryData.lng,
        lat:queryData.lat,
        where_like:queryData.where_like,
        magic_form_id: queryData.formId || ''
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 获取商品专题活动数据
  getGoodsActivityData(queryData, callback){
    let param = {
      url: 'v5/magic_subject/get_subject_goods',
      data: {
        subject_id: queryData.subject_id,
        page: queryData.pageNum
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
}
const TimeLimitActivityDetailModel = new TimeLimitActivityDetail()
export default TimeLimitActivityDetailModel
