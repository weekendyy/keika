import Base from '../utils/base.js'
class cheader extends Base {
  constructor() {
    super()
  }
  getBannerInfo(queryData, callback) {
    let param = {
      url: 'v5/magic_card/home_banner',
      data: {
        banner_type: queryData.banner_type,
        versions: 'vip4'
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
}
const cheaderModel = new cheader()
export default cheaderModel
