var app = getApp();
Page({
  data: {
    background: ['green', 'red', 'yellow'],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    current:0,//当前轮播下标
    modelList:[], //
    fabricList:[],
    fabricId:1, //当前点击的fabricID
    picname:''
  },
  onShow(){
    const that = this;
     my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/index',
      method: 'get',
      data: {
        // from: '支付宝',
        // production: 'AlipayJSAPI',
      },
      dataType: 'json',
      success: function(res) {
        console.log(JSON.stringify(res))
        let fabricList = res.data.list[that.data.current].typelist;
        fabricList[0].fabricActive = true;
        that.setData({
          modelList:res.data.list,
          fabricList:fabricList
        })

        // my.alert({content: 'success'});
        console.log(JSON.stringify(that.data.modellist))
      },
      fail: function(res) {
        // my.alert({content: 'fail'});
      },
      complete: function(res) {
        // my.hideLoading();
        // my.alert({content: 'complete'});
      }
    });
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  onLoad() {},
  fabricTap(e){
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    this.setData({
      fabricId:e.currentTarget.dataset.id
    })
  },
  swiperChange(e){
    let fabric = this.data.modelList[e.detail.current].typelist;
   
    this.setData({  
      current: e.detail.current,
      fabricList :fabric ,
      fabricId:fabric[0].id,
      picname:this.data.modelList[e.detail.current].picname
    })
    console.log(this.data.fabricList)
    // this.setData()
    // console.log(this.data.current)  
  },
  nextStep(){
    console.log(this.data.current)
    console.log(this.data.fabricId)
    const index = this.data.current  //款式id
    const picname = this.data.picname
    my.navigateTo({ url: "../index/index?prodId="+index+"&picname="+picname });
    app.globalData.items = []  //清空定制项
  }
});
