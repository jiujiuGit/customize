var app = getApp();
Page({
  data: {
    background: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    // currentTab:1,
    tname:'',//款式
    sizes:[],
    currentTab:0,
    side:'正面',
    sizeTab:0,
    success:false, //是否下单成功
    wid:'',//
    total_amount:'',
    type:app.globalData.type
  },
  onLoad(query) {
    console.log(app.globalData.type)
    let params = ''
    if(app.globalData.type == 3){
      params= {
        wid:query.id,
        orderid:app.globalData.teamIndividual.parent_orderid
      }
    }else{
      params= {
        wid:query.id,
        // wid:1273,
      }
    }
    this.setData({
      wid:query.id,
      // wid:1273,
      type:app.globalData.type
    });
    console.log(this.data.type)
    const that = this;
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getWorkdetail', // 目标服务器url
      dataType:'json',
      method: 'post',
      data:params,
      success: (res) => {
        if(res.data.status==0){
          my.showToast({
            type: 'fail',
            content: '服务器繁忙，请稍候再试',
            duration: 2000,
          });
          return;
        }
        console.log(res.data.data.pic2)
        let bgList = [res.data.data.pic1,res.data.data.pic2,res.data.data.pic3,res.data.data.pic4];
        // let bgList = ['../../assets/images/108.png','../../assets/images/img_geren.png']
        console.log(bgList)
        that.setData({
          background:bgList,
          tname:res.data.data.tname,
          sizes:res.data.data.sizes,
          total_amount:res.data.data.total_amount
        })
        console.log(that.data.sizes)
      },
    });

  },
  sizeTap(e){
    console.log(e.target.dataset.index)
    this.setData({
      sizeTab:e.target.dataset.index
    })
    console.log(this.data.sizeTab)
  },
  left(){
    const that = this;
    let current = this.data.currentTab;
    
    if(current==0){
      return;
    }
    this.setData({
      currentTab:current-1
    })
    const num = this.data.currentTab
    switch(num){
      case 0:
        that.setData({
          side:'正面'
        })
        break;
        
      case 1:
        that.setData({
          side:'反面'
        })
        break;

      case 2:
        that.setData({
          side:'左侧'
        })
        break;
      case 3:
        that.setData({
          side:'右侧'
        })
        break;
    }
  },
  right(){
    const that = this;
    let current = this.data.currentTab;

    if(current==this.data.background.length-1){
      return;
    }
    this.setData({
      currentTab:current+1
    })
    console.log(this.data.currentTab)
     const num = this.data.currentTab
    switch(num){
      case 0:
        that.setData({
          side:'正面'
        })
        break;
        
      case 1:
        that.setData({
          side:'反面'
        })
        break;

      case 2:
        that.setData({
          side:'左侧'
        })
        break;
      case 3:
        that.setData({
          side:'右侧'
        })
        break;
    }
  },
  changeimage(e) {
    const that = this;
    var num = e.detail.current;
    switch(num){
      case 0:
        that.setData({
          side:'正面'
        })
        break;
        
      case 1:
        that.setData({
          side:'反面'
        })
        break;

      case 2:
        that.setData({
          side:'左侧'
        })
        break;
      case 3:
        that.setData({
          side:'右侧'
        })
        break;
    }
    var source = e.detail.source;
    this.setData({
      currentTab: num,
    })
    console.log(this.data.currentTab)
    console.log(num, source)
  },
  // 下一步
  confirmOrder(){
    const that = this;
    let params = ''
    if(app.globalData.type == 3){
      params = {
        size:that.data.sizes[that.data.sizeTab],
        wid:that.data.wid,
        zfb_userid:app.globalData.userInfo.userId,
        parent_sn:app.globalData.teamIndividual.parent_orderid
      }
    } else{
      params = {
        size:that.data.sizes[that.data.sizeTab],
        wid:that.data.wid,
        zfb_userid:app.globalData.userInfo.userId,
      }
    }

    if(that.data.type==1){ //个人定制
      let params = {
        size:that.data.sizes[that.data.sizeTab],
        wid:that.data.wid,
        zfb_userid:app.globalData.userInfo.userId,
        total_amount:that.data.total_amount
        // id:res.data.order
      }
      my.navigateTo({url:'../individualForm/individualForm?params='+JSON.stringify(params)});
    }else{  //团体定制、团体定制下的个人定制
      my.httpRequest({
      url:'http://bbltest.color3.cn/Mobile/Api/suborder',
      method:'POST',
      dataType:'json',
      data:params,
      success:function(res){
        if(res.data.status==0){
          my.showToast({
            type: 'fail',
            content: '服务器繁忙，请稍候再试',
            duration: 2000,
          });
          return;
        }
        if(res.data.status == 1){
          that.setData({
              success:true
          })
          // if(that.data.type==1){
          //   my.navigateTo({url:'../individualForm/individualForm?id='+res.data.order});
          // }else if(that.data.type == 3){
            
          // }

        }
      },
      fail:function(){

      }
    })
    }
    
  },

  home(){
    my.reLaunch({url:'../customType/customType'});
  }
});
