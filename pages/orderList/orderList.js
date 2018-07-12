Page({
  data: {},
  onLoad() {
    my.showLoading({
      content: '加载中...',
    });
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getOrderList', // 目标服务器url
      dataType:"json",
      method:'POST',
      data:{
        userid:999
      },
      success: (res) => {
        
      },
      complete:(res)=>{
        my.hideLoading();
      }
    });
  },
});
