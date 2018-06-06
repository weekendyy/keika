import Base from '../../utils/base.js'
class Activity extends Base {
  constructor() {
    super()
  }

  getActiveData(queryData,callback){
    let param = {
      url: 'v5/magic_home_area/activity_area',
      data: {
        activity_type: queryData.type
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
