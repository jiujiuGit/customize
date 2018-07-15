Page({
  data: {
    background: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    // currentTab:1,
    tname:'',//款式
    sizes:[],
    currentTab:1,
    side:'正面',
    sizeTab:0,
    success:false //是否下单成功
  },
  onLoad(query) {
    // this.setData({
    //   id:query.id
    // });
    const that = this;
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getWorkdetail', // 目标服务器url
      dataType:'json',
      method: 'post',
      data:{
        wid:query.id
      },
      success: (res) => {
        console.log(res.data.data.pic2)
        let bgList = [res.data.data.pic1,res.data.data.pic2,res.data.data.pic3];
        // let bgList = ['../../assets/images/108.png','../../assets/images/img_geren.png']
        console.log(bgList)
        that.setData({
          background:bgList,
          tname:res.data.data.tname,
          sizes:res.data.data.sizes
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
          side:'侧面'
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
          side:'侧面'
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
          side:'侧面'
        })
        break;
    }
    var source = e.detail.source;
    this.setData({
      currentTap: num,
    })
    console.log(num, source)
  },
  // 下一步
  confirmOrder(){
    const that = this;
    my.httpRequest({
      url:'http://bbltest.color3.cn/Mobile/Api/suborder',
      method:'POST',
      dataType:'json',
      data:{
        size:that.data.sizes[that.data.sizeTab],
        wid:77,
        zfb_userid:'999'
      },
      success:function(res){
        if(res.data.status == 1){
          my.navigateTo({url:'../individualForm/individualForm?id='+res.data.order});
          // that.setData({
          //   success:true
          // })
        }
      },
      fail:function(){

      }
    })
  },

  home(){
    my.reLaunch({url:'../customType/customType'});
  }
});
