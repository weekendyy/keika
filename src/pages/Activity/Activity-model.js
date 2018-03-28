import Base from '../../utils/base.js'
class Activity extends Base {
  constructor() {
    super()
  }

  /**
   * 获取正在进行中的活动
   * @param queryData
   * @param callback
   */
  getConduct(queryData,callback){
    let param = {
      url: 'v5/magic_goods/recommend_merge_goods',
      data: {
        page_num: queryData,
        time_status: '1'
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   *  获取已经过期的活动
   * @param queryData
   * @param callback
   */
  getPast(queryData, callback) {
    let param = {
      url: 'v5/magic_goods/recommend_merge_goods',
      data: {
        page_num: queryData.pageNum,
        time_status: '2',
        magic_form_id: queryData.magic_formID||''
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
}
const ActivityModel = new Activity()
export default ActivityModel
