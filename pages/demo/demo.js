var app = getApp();
Page({
  data: {},
  onLoad() {
      my.downloadFile({
      // url: 'http://pic-bucket.nosdn.127.net/photo/0001/2018-07-26/DNKIQU5R00AO0001NOS.jpg',
        url: 'http://bbltest.color3.cn/Public/upload/diyset/2016/12-20/5858d5ed6f5bd.png',
      success({ apFilePath }) {
        console.log(JSON.stringify(apFilePath));
        app.globalData.demo  = apFilePath
        my.previewImage({
          urls: [apFilePath],
        });
      },
      fail(res) {
        my.alert({
          content: res.errorMessage || res.error,
        });
      },
    });
  },
  tz(){
    // my.navigateTo({url:'../demo1/demo1'});
    my.navigateBack({
      delta: 1
    })
  }
});
