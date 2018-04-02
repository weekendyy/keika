import Base from '../../utils/base.js'
class Shop extends Base {
  constructor() {
    super()
  }

  /**
   * 福利活动详情
   * @param queryData
   * @param callback
   */
  getWelfareData(queryData, callback) {
    let param = {
      url: 'v5/magic_goods/get_home_goods_detail',
      data: {
        magic_goods_id: queryData.id,
        versions: 'vip5'
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 好店推荐 获取最新的好店推荐
   * @param queryData
   * @param callback
   */
  getShopIndexData(queryData, callback){
    let Geography = wx.getStorageSync('GeographyData')
    let param = {
      url: 'v5/magic_shop/magic_shop_list',
      data: {
        page_num: queryData,
        versions: 'vip4',
        lng: Geography.latitude,
        lat: Geography.longitude,
        choose_type: '1'
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  /**
   * 附近推荐 获取最新的好店推荐
   * @param queryData
   * @param callback
   */
  getNearbyData(queryData, callback) {
    let Geography = wx.getStorageSync('GeographyData')
    let param = {
      url: 'v5/magic_shop/magic_shop_list',
      data: {
        page_num: queryData.page_num,
        versions: 'vip4',
        lng: Geography.latitude,
        lat: Geography.longitude,
        choose_type: '2',
        magic_form_id: queryData.magic_form_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 获取店铺详情
   */
  getShopDetail(queryData, callback){
    let param = {
      url: 'v5/magic_shop/magic_shop_detail_data',
      data: {
        magic_shop_id: queryData.magic_shop_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 领取福利
   * @param queryData
   * @param callback
   */
  addWelfare(queryData, callback){
    let param = {
      url: 'v5/magic_goods/get_goods',
      data: {
        goods_id: queryData.goods_id
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 提交入驻信息
   * @param queryData
   * @param callback
   */
  postJoinShop(queryData, callback){
    let param = {
      url: 'v5/magic_shop/add_from_in_data',
      data: {
        link_tel: queryData.link_tel,
        link_shop_name: queryData.link_shop_name,
        wechat_name: queryData.wechat_name,
        wechat_img: queryData.wechat_img,
        magic_form_id: queryData.formId
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }

  /**
   * 获取好店列表信息
   * @param queryData
   * @param callback
   */
  getShopListInfo(queryData, callback){
    let param = {
      url: 'v5/magic_shop/magic_shop_classify',
      data: {
        page_num: queryData.page_num,
        choose_type: queryData.choose_type,
        parent_classify_id: queryData.parent_classify_id,
        son_classify_id: queryData.son_classify_id,
        lng: queryData.lng,
        lat: queryData.lat
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
}
const ShopModel = new Shop()
export default ShopModel
