Page({
  data: {
    stickers:[
      {
      imgUrl:'../../assets/images/t1.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t5.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t5.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t2.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t3.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t4.jpg',
      mode: 'widthFix',
      },
      
    ]
  },
  onLoad() {},
  imageTap(e) {
    my.navigateBack({
      delta: 2
    })
  },
});
