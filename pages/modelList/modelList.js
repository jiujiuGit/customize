var app = getApp();
Page({
  data: {
    type:0, //定制类型 ，1个人，2团体
    background: ['green', 'red', 'yellow'],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    current:0,//当前轮播下标
    modelList:[], //
    fabricList:[],
    fabricId:1, //当前点击的fabricID
    picname:'',
    swiperList: [],//除了1，2之外，其它的swpClass都是swp-rightNo
    swpCurIdx:0,
    swpPrevPosition:'',
    swpEndPosition:''
  },
  onShow(){
    const that = this;
    my.showLoading({
      content: '加载中...'
    });
     my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/index',
      method: 'get',
      data: {
        // from: '支付宝',
        // production: 'AlipayJSAPI',
      },
      dataType: 'json',
      success: function(res) {
        // console.log(JSON.stringify(res))
        // let odelList = res.data.list;
        my.hideLoading();
        if(res.data.status==0){
          my.showToast({
            type: 'fail',
            content: '服务器繁忙，请稍候再试',
            duration: 2000,
          });
          return;
        }
        let fabricList = res.data.list[that.data.current].typelist;
        fabricList[0].fabricActive = true;

        let swpList =  res.data.list;
        for(var i=0;i<swpList.length;i++){
          if(i==0){
            swpList[i].swpClass = 'swp-center'
          }else if(i==1){
            swpList[i].swpClass = 'swp-right'
          }else{
            swpList[i].swpClass = 'swp-rightNo'
          }
        }
        that.setData({
          swiperList:swpList,
          modelList:res.data.list,
          fabricList:fabricList,
          swpCurIdx:0
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
  onLoad() {
    this.setData({
      type:app.globalData.type, //定制类型 ，1个人，2团体
    })
  },
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
    const index = this.data.swpCurIdx;
    const prodId = this.data.modelList[this.data.swpCurIdx].id;  //款式id
    // console.log(index)
    const picname = this.data.swiperList[index].picname;
    const fabricId = this.data.fabricId;
    console.log(this.data.type)
    app.globalData.frontItems = []  //清空定制项
    app.globalData.backItems = []
    if(this.data.type == 2){
      app.globalData.teamData = {//团体
        prodId:prodId, //款式id
        picname:picname,//款式名字
        fabricId:fabricId//面料id
      }
      my.navigateTo({url:'../groupForm/groupForm'});
      // my.navigateTo({ url: "../index/index?prodId="+prodId+"&picname="+picname+'&fabricId'+this.data.fabricId });
    }else if(this.data.type == 1){  //个人
        my.navigateTo({url:'../index/index'});
        // my.navigateTo({ url: "../index/index?prodId="+prodId+"&picname="+picname+'&fabricId'+this.data.fabricId });
        
        this.setData({
          stickerIndex : -1
        })
        app.globalData.individualData = {
          prodId:prodId, //款式id
          picname:picname,//款式名字
          fabricId:fabricId//面料id
      }
        app.globalData.footer = 'list' //定制页面底部展示列表
    }
    
  },
  swpBtn: function (e) {
    var swp = this.data.swiperList;
    var max = swp.length;
    var idx = e.currentTarget.dataset.index;
    var prev = swp[idx - 1];//前一个
    var next = swp[idx + 1];//后一个
    var curView = swp[idx];//当前
    console.log(idx)
   
    if (prev) {//如果当前的前面有
      if (next) {//当前的后面有
        next.swpClass = "swp-right";
      }
      prev.swpClass = "swp-left";
      curView.swpClass = "swp-center";
      for (var i = 0; i < idx; i++) { //当前前一个的前面所有
        swp[i].swpClass = 'swp-leftNo'
      }
    }
    if (next) {//如果当前的后面有
      if (prev) {//当前的前面有
        prev.swpClass = "swp-left";
      }
      curView.swpClass = "swp-center";
      next.swpClass = "swp-right";
      for (var i = (idx + 2); i < max; i++) {//当前后一个的后面所有
        swp[i].swpClass = 'swp-rightNo'
      }
    } else {
      prev.swpClass = "swp-left";
      curView.swpClass = "swp-center";
    }

    this.setData({
      swiperList: swp,
      swpCurIdx: idx
    })
  },
  swpTouchStart:function(e){
    console.log(e.touches[0].clientX)
    this.setData({
      swpPrevPosition: e.touches[0].clientX
    })
  },
  swpTouchMove:function(e){
    let clientX = this.data.swpPosition + e.touches[0].clientX;
    this.setData({
      swpEndPosition: e.touches[0].clientX
    })
    // console.log(this.data.swpPosition)
  },
  swpTouchEnd:function(e){

    var swp = this.data.swiperList;
    var max = swp.length;
    var idx = this.data.swpCurIdx;
    
    let swpEndPosition = this.data.swpEndPosition;
    let swpPrevPosition = this.data.swpPrevPosition;
    if (swpEndPosition - swpPrevPosition>30){
      if (idx == 0) {
        return;
      }
      idx -=1
      console.log('swipLeft')
      this.setData({
        swpCurIdx:idx
      })
    }
    if (swpPrevPosition - swpEndPosition>30){
      if (idx == max - 1) {
        return;
      }
      idx += 1
      console.log('swipRight')
      this.setData({
        swpCurIdx: idx
      })
    }
    var prev = swp[idx - 1];//前一个
    var next = swp[idx + 1];//后一个
    var curView = swp[idx];//当前


    if (prev) {//如果当前的前面有
      if (next) {//当前的后面有
        next.swpClass = "swp-right";
      }
      prev.swpClass = "swp-left";
      curView.swpClass = "swp-center";
      for (var i = 0; i < idx; i++) { //当前前一个的前面所有
        swp[i].swpClass = 'swp-leftNo'
      }
    }
    if (next) {//如果当前的后面有
      if (prev) {//当前的前面有
        prev.swpClass = "swp-left";
      }
      curView.swpClass = "swp-center";
      next.swpClass = "swp-right";
      for (var i = (idx + 2); i < max; i++) {//当前后一个的后面所有
        swp[i].swpClass = 'swp-rightNo'
      }
    } else {
      prev.swpClass = "swp-left";
      curView.swpClass = "swp-center";
    }
    let fabric = this.data.modelList[this.data.swpCurIdx].typelist;
   
//     this.setData({  
//       current: e.detail.current,
//       fabricList :fabric ,
//       fabricId:fabric[0].id,
//       picname:this.data.modelList[e.detail.current].picname
//     })
    this.setData({
      swiperList: swp,
      fabricList :fabric ,
      fabricId:fabric[0].id,
    })
  }
});
