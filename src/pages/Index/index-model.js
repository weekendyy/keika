import Base from '../../utils/base.js'
class Index extends Base {
  constructor() {
    super()
  }

  /**
   * 获取首页有没有开通会员
   * @param callback 有开通会员的时候,就显示轮播,没有开通就提示开通的会员信息
   */
  getWelfare(queryData, callback) {
    let param = {
      url: 'v5/magic_goods/home_goods_list',
      data: {
        page_num: queryData.page_num,
        versions: 'vip4'
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
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
}
const indexModel = new Index()
export default indexModel
