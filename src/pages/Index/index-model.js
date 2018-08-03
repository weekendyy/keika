import Base from '../../utils/base.js'
class Index extends Base {
  constructor() {
    super()
  }
  /**
   * 首页活动
   * @param callback
   */
  getActivity(callback) {
    let param = {
      url: 'v5/magic_goods/home_merge_goods',
      sCallback: function(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 获取首页导航
   * @param callback
   */
  getNaData(callback) {
    let param = {
      url: 'v3/classify/classify_data',
      sCallback: function(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  
  // 获取首页主要信息
  getMainData(callback){
    let param = {
      url: 'v5/magic_home_area/home_area_new',
      sCallback: function(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 是否有抽奖
  isLottery(callback){
    let param = {
      url: 'v8/reward_goods/has_reward',
      sCallback: function(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
}
const indexModel = new Index()
export default indexModel
