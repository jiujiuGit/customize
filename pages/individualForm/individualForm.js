var app = getApp();
Page({
  data: {
    orderId:'',
    pros:[],  //省列表
    citys:[],  //市列表
    province:{
      name:''
    },//选中的省信息
    cityPicker:true, //未选中省不能选择市
    city:{
      name:''
    }, //选中的市信息
    wenan:{}, //弹框文案
    layerShow:false,
    sec:10,
    myInterval:''
  },
  onLoad(query) {
    const that = this;
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getPro', // 目标服务器url
      method:'POST',
      dataType:'json',
      data:{

      },
      success: (res) => {
        if(res.data.status==0){
          my.showToast({
            type: 'fail',
            content: '服务器繁忙，请稍候再试',
            duration: 2000,
          });
          return;
        }
        that.setData({
          pros:res.data.list,
          orderId:query.id
        })
      },
    });
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getwenan', // 目标服务器url
      methos:'POST',
      dataType:'json',
      data:{},
      success: (res) => {
        that.setData({
          wenan:res.data
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
  onlyCall(){ //点击客服热线
    my.makePhoneCall({
      number: this.data.wenan.phone, // 电话号码
    });
  },
  call(){
    const that = this;
    this.setData({
      layerShow:false
    })
    clearInterval(that.data.myInterval);
    my.navigateTo({url:'../orderDetail/orderDetail?id='+that.data.orderId});
    // my.navigateTo({url:'../orderDetail/orderDetail'});
    my.makePhoneCall({
      number: this.data.wenan.phone, // 电话号码
    });
  },
  // companyInput(e){
  //   this.setData({
  //     company: e.detail.value,
  //   });
  // },
  addressInput(e){
    this.setData({
      address: e.detail.value,
    });
  },
  
  // peopleInput(e){
  //   this.setData({
  //     peoplenum: e.detail.value,
  //   });
  // },
  // numberInput(e){
  //   this.setData({
  //     numper: e.detail.value,
  //   });
  // },
  // timeInput(e){
  //   this.setData({
  //     yjtimwbank: e.detail.value,
  //   });
  // },
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
    // my.showLoading({
    //   content: '加载中...',
    // });
     
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    const that = this
    this.setData({
      province: this.data.pros[e.detail.value],
      cityPicker:false,
      city:{
        name:''
      },
    });
    // 请选择市
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getCity?parent_id='+that.data.province.id, // 目标服务器url
      method:'GET',
      dataType:'json',

      success: (res) => {
        if(res.data.status==0){
          my.showToast({
            type: 'fail',
            content: '服务器繁忙，请稍候再试',
            duration: 2000,
          });
          return;
        }
        that.setData({
          citys:res.data.list
        })
      },
      fail:(res) => {

      },
      complete:(res) =>{
        // my.hideLoading();
      }
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
    
    if(that.data.name=='' || that.data.name == undefined){
      my.alert({
        title: '提示',
        content: '联系人姓名不能为空！',
        buttonText:'确定',
      });
      return;
    }
    if(that.data.phone=='' || that.data.phone == undefined){
      my.alert({
        title: '提示',
        content: '联系人电话不能为空！',
        buttonText:'确定',
      });
      return;
    }
    if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(that.data.phone))&& !(/0\d{2}-\d{7,8}/.test(that.data.phone))){ 
       my.alert({
        title: '提示',
        content: '请输入正确的电话号码！',
        buttonText:'确定',
      });
      return;
    } 
    
    if(that.data.address=='' || that.data.address == undefined){
      my.alert({
        title: '提示',
        content: '详细地址不能为空！',
        buttonText:'确定',
      });
      return;
    }
    if(that.data.province.id=='' || that.data.province.id == undefined){
      my.alert({
        title: '提示',
        content: '省信息不能为空！',
        buttonText:'确定',
      });
      return;
    }
    if(that.data.city.id=='' || that.data.city.id == undefined){
      my.alert({
        title: '提示',
        content: '市信息不能为空！',
        buttonText:'确定',
      });
      return;
    }
    if(that.data.address=='' || that.data.address == undefined){
      my.alert({
        title: '提示',
        content: '详细地址不能为空！',
        buttonText:'确定',
      });
      return;
    }
    my.httpRequest({
      url:'http://bbltest.color3.cn/Mobile/Api/subgerenaddress',
      dataType:'json',
      method:'POST',
      data:{
        orderid:that.data.orderId,
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
        if(res.data.status==0){
          my.showToast({
              type: 'fail',
              content: '服务器繁忙，请稍候再试',
              duration: 2000,
          });
          return;
        }
        that.setData({
            layerShow:true
        })
        
        var timesRun = 10;
        that.data.myInterval = setInterval(function(){
          timesRun -= 1;
          that.setData({
            sec:timesRun
          })
          if(timesRun === 0){
            clearInterval(that.data.myInterval);
            that.setData({
              layerShow:false
            })
            my.reLaunch({
              url: '../customType/customType', // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
              success: (res) => {
                
              },
            });

          }
          
          //do whatever here..
        }, 1000);
        // if(res.data.status){
          
        // }else{
        //   my.showToast({
        //     type: 'fail',
        //     content: '服务器繁忙，请稍候再试',
        //     duration: 2000,
        //   });
        // }
        // app.globalData.teamData.order = res.data.order
        // my.showToast({
        //   type: 'success',
        //   content: '提交成功！',
        //   duration: 3000,
        //   success: () => {
        //     my.reLaunch({url:'../customType/customType'});
        //   },
        // });
        
      }
    })
    
  }
});
