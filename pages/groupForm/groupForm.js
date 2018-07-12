var app = getApp();
Page({
  data: {
    pros:[],  //省列表
    citys:[],  //市列表
    province:{},//选中的省信息
    cityPicker:true, //未选中省不能选择市
    city:{}, //选中的市信息
    
  
  },
  onLoad() {
    const that = this;
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getPro', // 目标服务器url
      method:'POST',
      dataType:'json',
      data:{

      },
      success: (res) => {
        that.setData({
          pros:res.data.list
        })
      },
    });

   
  },
  nameInput(e){
    this.setData({
      name: e.detail.value,
    });
  },
  telInput(e){
    this.setData({
      phone: e.detail.value,
    });
  },
  companyInput(e){
    this.setData({
      company: e.detail.value,
    });
  },
  addressInput(e){
    this.setData({
      address: e.detail.value,
    });
  },
  
  peopleInput(e){
    this.setData({
      peoplenum: e.detail.value,
    });
  },
  numberInput(e){
    this.setData({
      numper: e.detail.value,
    });
  },
  timeInput(e){
    this.setData({
      yjtimwbank: e.detail.value,
    });
  },
  chooseCity(){
    const that = this;
    if(that.data.province.id == undefined){
      my.showToast({
        type: 'exception',
        content: '请先选择省/直辖市',
        duration: 3000,
        
      });
      return;
    }
    
    
    console.log(that.data.cityPicker)
    my.showLoading({
      content: '加载中...',
    });
     // 请选择市
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getCity?parent_id='+that.data.province.id, // 目标服务器url
      method:'GET',
      dataType:'json',

      success: (res) => {
        that.setData({
          citys:res.data.list
        })
      },
      fail:(res) => {

      },
      complete:(res) =>{
        my.hideLoading();
      }
    });
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      province: this.data.pros[e.detail.value],
      cityPicker:false,
      city:{}
    });
  
  },
  cityPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      city: this.data.citys[e.detail.value],
    });
  },
  next(){
    const that = this;
    console.log(that.data.company);
    
    // if(that.data.name=='' || that.data.name == undefined){
    //   my.alert({
    //     title: '提示',
    //     content: '联系人姓名不能为空！',
    //     buttonText:'确定',
    //   });
    //   return;
    // }
    // if(that.data.phone=='' || that.data.phone == undefined){
    //   my.alert({
    //     title: '提示',
    //     content: '联系人电话不能为空！',
    //     buttonText:'确定',
    //   });
    //   return;
    // }
    // if(that.data.address=='' || that.data.address == undefined){
    //   my.alert({
    //     title: '提示',
    //     content: '详细地址不能为空！',
    //     buttonText:'确定',
    //   });
    //   return;
    // }
    // if(that.data.province.id=='' || that.data.province.id == undefined){
    //   my.alert({
    //     title: '提示',
    //     content: '省信息不能为空！',
    //     buttonText:'确定',
    //   });
    //   return;
    // }
    // if(that.data.city.id=='' || that.data.city.id == undefined){
    //   my.alert({
    //     title: '提示',
    //     content: '市信息不能为空！',
    //     buttonText:'确定',
    //   });
    //   return;
    // }
    // if(that.data.address=='' || that.data.address == undefined){
    //   my.alert({
    //     title: '提示',
    //     content: '详细地址不能为空！',
    //     buttonText:'确定',
    //   });
    //   return;
    // }
    my.httpRequest({
      url:'http://bbltest.color3.cn/Mobile/Api/subteamorder',
      dataType:'json',
      method:'POST',
      data:{
        company:that.data.company, //公司
        phone:that.data.phone,//电话
        name:that.data.name,//联系人姓名
        pro_id:that.data.province.id,//省份id
        city_id:that.data.city.id,//城市id
        address:that.data.address,//详细地址
        yjtimwbank:that.data.yjtimwbank,//预计使用时间
        numper:that.data.numper,//每人件数
        peoplenum:that.data.peoplenum//人数
      },
      success:function(res){
        console.log(res.data.order)
        app.globalData.teamData.order = res.data.order
      }
    })
    my.navigateTo({url:'../index/index'})
  }
});
