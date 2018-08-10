import Base from '../utils/base.js'
class distributionModel extends Base {
  constructor() {
    super()
  }
  // 获取分销首页数据
  getIndexData(queryData, callback){
    let param = {
      url: 'v13/distribut_user/info',
      data: {
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 获取订单信息
  getOrderInfo(queryData, callback){
    let param = {
      url: 'v13/distribut_order/dis_order',
      data: {
        type: queryData.type,
        page: queryData.pageNum
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 提现
  withDraw(queryData, callback){
    let param = {
      url: 'v13/distribut_order/apply_cash',
      data: {
        money: queryData.money
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 佣金排行版
  getRankData(queryData, callback){
    let param = {
      url: 'v13/distribut_user/rank',
      data: {
        page: queryData.pageNum
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 我的团队信息
  getMyteamData(queryData, callback){
    let param = {
      url: 'v13/distribut_user/my_team',
      data: {
        page: queryData.pageNum
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 提现
  myMoneyDetail(queryData, callback){
    let param = {
      url: 'v13/distribut_user/money',
      data: {
        page: queryData.pageNum
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 分销商品列表
  getLotteryList(queryData, callback) {
    let param = {
      url: 'v13/distribut_goods/dis_goods',
      data: {
        type: queryData.type,
        page: queryData.pageNum
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 注册
  registe(queryData, callback){
    let param = {
      url: 'v13/distribut_user/reg',
      data: {
        phone: queryData.phone,
        password: queryData.password,
        login_name: queryData.name,
        leader_id: queryData.leadId
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 登录
  login(queryData, callback){
    let param = {
      url: 'v13/distribut_user/login',
      data: {
        phone: queryData.phone,
        password: queryData.password
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 获取二维码
  creatPoster(queryData, callback){
    let param = {
      url: 'v13/poster/get_poster',
      data: {
        type: queryData.type,
        goods_id: queryData.goodsId,
        dis_id: queryData.disId
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  // 生成海报 分销达人下级
  buildPoster(res,Th,isReg,name){
    let that = Th
    wx.downloadFile({
      url: res.data.data,
      success: function(res1){
        let qrcode = res1.tempFilePath
        const ctx = wx.createCanvasContext('posterId')
        if(isReg){
          ctx.drawImage('./images/shareposter.jpg', 0, 0, 200, 345)
        }else{
          ctx.drawImage('./images/shareposter.jpg', 0, 0, 200, 345)
        }
        ctx.setTextAlign('right')
        ctx.setFontSize(10)
        ctx.fillText(name+'招募', 85, 150)
        ctx.fillText('啦', 177, 150)
        ctx.drawImage(qrcode, 127, 208, 65, 65)
        ctx.draw(true)
        setTimeout(()=>{
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 200,
            height: 345,
            destWidth: 750,
            destHeight: 1292,
            canvasId: 'posterId',
            fileType: 'jpg',
            quality: 1,
            success: (res)=> {
              that.posterImg = res.tempFilePath
              wx.hideLoading()
              wx.previewImage({
                current: that.posterImg,
                urls: [that.posterImg]
              })
              that.$apply()
            },
            fail: (res)=>{
              console.log(res)
            }
          })
        },500)
      }
    })
  }
  // 生成海报 vip卡
  buildPosterVip(Th,qrCode,price,cardName){
    wx.showLoading({
      title: '海报生成中..'
    })
    let userInfo = wx.getStorageSync('userInfo')
    let that = Th
    wx.downloadFile({
      url: qrCode,
      success: function(res1){
        let qrcode = res1.tempFilePath
        wx.downloadFile({
          url: userInfo.avatarUrl,
          success: function(res2){
            let userIcon = res2.tempFilePath
            const ctx = wx.createCanvasContext('VipCanvas')
            ctx.drawImage('./images/vipcard.jpg', 0, 0, 200, 345)
            // 绘制用户昵称
            ctx.setTextAlign('left')
            ctx.setFillStyle('white')
            ctx.setFontSize(9)
            ctx.fillText(userInfo.nickName+'，邀你加入', 58, 25)
            // 绘制用户头像
            ctx.drawImage(userIcon, 17,16,18,18)
            ctx.drawImage('./images/vipcarduserpic.png', 0,8,55,33)
            // 绘制价格
            ctx.setFillStyle('red')
            ctx.setFontSize(10)
            ctx.fillText('¥', 4, 329)
            ctx.setFontSize(17)
            ctx.fillText(price, 14, 330)
            // 绘制黑卡名称
            ctx.setFillStyle('#4C4C4C')
            ctx.setFontSize(8)
            ctx.fillText(cardName, 55, 335)
            ctx.drawImage(qrcode, 135, 290, 50, 50)
            ctx.draw(true)
            setTimeout(()=>{
              wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 195,
                height: 346,
                destWidth: 750,
                destHeight: 1334,
                canvasId: 'VipCanvas',
                fileType: 'jpg',
                quality: 1,
                success: (res)=> {
                  that.posterImg = res.tempFilePath
                  wx.hideLoading()
                  wx.previewImage({
                    current: that.posterImg,
                    urls: [that.posterImg]
                  })
                  that.$apply()
                },
                fail: (res)=>{
                  console.log(res)
                }
              })
            },500)
          }
        })
      }
    })
  }
}
const disModel = new distributionModel()
export default disModel
