Page({
  data: {
    background: ['green', 'red', 'yellow'],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    current:0,
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  onLoad() {},
  fabricTap(e){
    console.log(e.currentTarget.dataset.index)
  },
  swiperChange(e){
    this.setData({  
      current: e.detail.current  
    })  
  },
  nextStep(){
    console.log(this.data.current);
    const index = this.data.current
    if(0){
      my.alert({
        title: '提示',
        content: '请选择面料',
        buttonText: '确定',
        success: () => {
        
        },
      });
      return;
    }
    my.navigateTo({ url: "../index/index?currentTap="+index });
  }
});
