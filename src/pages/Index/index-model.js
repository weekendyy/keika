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
      url: 'v5/magic_home_area/home_area',
      sCallback: function(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // for(let i=0; i<this.goodsListOld.length;i++){
  //   this.goodsList.push({})
  //   for(let k=0; k<this.goodsListOld[i].goods_data.length; k++){
  //     let isTrue = true
  //     for(let j=0; j<this.goodsList[i].length; j++){
  //       if(this.goodsList[i].type === this.goodsListOld[i].goods_data[k].style_type){
  //         this.goodsList[i].content.push(this.goodsListOld[i].goods_data[k])
  //         isTrue = false
  //       }
  //     }
  //     if(isTrue){
  //       this.goodsList[i].type=this.goodsListOld[i].goods_data[k].style_type,
  //       this.goodsList[i].content=[]
  //     }
  //   }
  // }
}
const indexModel = new Index()
export default indexModel
