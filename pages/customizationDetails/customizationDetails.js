Page({
  data: {
    orderSn:'',//父订单号
    list:[]
  },
  onLoad(query) {
    const that = this;
    that.setData({
      orderSn:query.id
    })
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/teamorderchillist', // 目标服务器url
      method:'POST',
      dataType:'json',
      data:{
        order_sn:that.data.orderSn
      },
      success: (res) => {
        that.setData({
          list:res.data.data
        })
      },
    });
  },
  call(){
     my.makePhoneCall({ number: '400-7417474' });
  },
  defaultTap(){
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/sureorderchil', // 目标服务器url
      mthod:'POST',
      dataType:'json',
      data:{

      },
      success: (res) => {
        
      },
    });
  }
});
