import Base from '../utils/base.js'
class NiceShop extends Base {
  constructor(){
    super()
  }

  getIndexData(queryData, callback){
    let param = {
      url: "v5/magic_shop/magic_shop_detail_new",
      data: {
        magic_shop_id: queryData.id
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    if(queryData.formId){
      param.data.magic_form_id = queryData.formId
    }
    this.request(param)
  }
  getMoreGoodsList(queryData, callback){
    let param = {
      url: "v5/magic_home_area/activity_list",
      data: {
        area_id: queryData.id,
        time_status: queryData.status
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  
}
const NiceShopModel = new NiceShop()
export default NiceShopModel
