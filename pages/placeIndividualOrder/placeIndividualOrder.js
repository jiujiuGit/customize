Page({
  data: {
    background: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    tname:'',//款式
    sizes:[],
    currentTap:0

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
        wid:77
      },
      success: (res) => {
        console.log(res.data.data.pic2)
        // let bgList = [res.data.data.pic1,res.data.data.pic2,res.data.data.pic3];
        let bgList = ['../../assets/images/108.png','../../assets/images/108.png']
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
      currentTap:e.target.dataset.index
    })
    console.log(this.data.currentTap)
  },
  changeimage(e) {
    var num = e.detail.current;
    var source = e.detail.source;
    this.setData({
      current: num,
    })
    console.log(num, source)
  },
});
