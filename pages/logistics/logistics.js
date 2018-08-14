Page({
  data: {
    logistic:'',
    list:[],
    consignee:'',
    address:''
  },
  onLoad(query) {
    const that = this;
    let params = JSON.parse(query.params)
    this.setData({
       consignee:params.consignee,
       address:params.address
    })
    console.log(query)
     my.httpRequest({
      url:'http://bbltest.color3.cn/Mobile/Api/selectkuaidi',
      dataType:'json',
      method:'POST',
      data:{
        
        shipping_code:params.shipping_code,
        shipping_name	:params.shipping_name
        // shipping_code:'800867508626210843',
        // shipping_name	:'yt'
      },
      success:function(res){
        if(res.data.resultcode!=200){
           my.showToast({
            type: 'fail',
            content: res.data.reason,
            duration: 2000,
          });
          return;
        }
        that.setData({
          logistic:res.data.result,
          list:res.data.result.list.reverse()
        })
      }
     })
  },
});
