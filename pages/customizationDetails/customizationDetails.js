Page({
  data: {
    orderSn:'',//父订单号
    id:'',//订单id
    list:[]
  },
  onLoad(query) {
    const that = this;
    console.log(query.id)
    that.setData({
      orderSn:query.order_sn,
      id:query.id
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
    const that = this;
    console.log(that.data.id)
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/sureorderchil', // 目标服务器url
      method:'POST',
      dataType:'json',
      data:{
        orderid:that.data.id
      },
      success: (res) => {
        if(res.data.status ==1){
            my.showToast({
              type: 'success',
              content: '下单成功',
              duration: 3000,
              success: () => {
                my.reLaunch({
                  url: '../customType/customType', // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
                });
              },
            });
        }
      },
    });
  }
});
