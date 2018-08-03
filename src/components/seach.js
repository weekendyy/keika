import Base from '../utils/base.js'
class Search extends Base {
  constructor(){
    super()
  }
  // 搜索商品
  getMoreGoodsList(queryData, callback){
    let param = {
      url: "v5/search/home",
      data: {
        keyword: queryData.keyword,
        page: queryData.pageNum
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 搜索店铺
  getMoreShopList(queryData, callback){
    let param = {
      url: "v5/search/shop",
      data: {
        keyword: queryData.keyword,
        page: queryData.pageNum
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  // 获取广告
  getAdData(queryData, callback){
    let param = {
      url: "v2/shop/adunit",
      data: {
      },
      sCallback(ResData){
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  
}
const SearchModel = new Search()
export default SearchModel
