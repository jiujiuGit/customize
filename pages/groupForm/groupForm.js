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
    my.navigateTo({url:'../index/index'})
  }
});
