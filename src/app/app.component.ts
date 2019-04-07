import { Component, ViewChild  } from '@angular/core';
import { Platform, Nav, ActionSheetController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { BindMeetingPage } from '../pages/bind-meeting/bind-meeting';

import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  footerBtn;
  // 父组件中使用@ViewChild拿到子组件的变量和方法（父组件可调用子组件的方法和变量）
  // 这里引入的是app.html <ion-nav>
  @ViewChild(Nav) nav: Nav;
  placeholder = 'assets/imgs/logo.jpg';
  chosenPicture: any;
  butPages;
  pages;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage,
      public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, 
      public camera: Camera) {

    //这里如果打开直接就跳到tab页面了
    //这里不能直接用firstIn他用了过后表示直接就有了。。。
    this.storage.get('isLogin').then((result) => {
      if(!result){
        this.rootPage = LoginPage;
      }else{
        let meetingId = window.localStorage.getItem("meetingId");
        //如果meetingId为空 那么跳转到绑定会议页面
        if(meetingId==null || typeof(meetingId) == "undefined" || meetingId == ""){
          this.rootPage = BindMeetingPage;
        }
        this.storage.set('isLogin', true);
        this.rootPage = TabsPage;
      }
    })

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.initPages();
    this.initButPages();
    this.initfooter();
  }

  initPages(){
    this.pages=[
      {title:'我的消息',component: TabsPage , icon:'ios-mail-outline'},
      {title:'我的好友',component: TabsPage,icon:'ios-contact-outline'},
      {title:'附近的人',component: TabsPage,icon:'ios-pin-outline'},
      {title:'商城',component: TabsPage,icon:'ios-cart-outline'},
      {title:'听歌识别',component: TabsPage,icon:'ios-mic-outline'},
      {title:'定时停止播放',component: TabsPage,icon:'ios-clock-outline'},
      {title:'扫一扫',component: TabsPage,icon:'ios-qr-scanner-outline'},
      {title:'音乐闹钟',component: TabsPage,icon:'ios-alarm-outline'},
      {title:'驾驶模式',component: TabsPage,icon:'ios-car-outline'},
      {title:'个性换肤',component: TabsPage,icon:'ios-shirt-outline'},
      {title:'音乐云盘',component: TabsPage,icon:'ios-cloudy-outline'}
    ]
  }

  initButPages(){
    this.butPages=[
      {title:'my info',component: TabsPage},
      {title:'my grade',component: TabsPage},
      {title:'my grade',component: TabsPage}
    ]
  }
  openPage(page) {
    this.nav.push(page.component);
  }
  initfooter(){
    this.footerBtn=[
      {title:'夜间',icon:'ios-moon-outline'},
      {title:'设置',icon:'ios-settings-outline'},
      {title:'退出',icon:'ios-power-outline'},
    ]
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.chooseFromAlbum();
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log("cancel");
        }
      }]
    });

    actionSheet.present().then(value => {
      return value;
    });
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: true,
    };

    this.camera.getPicture(options).then(image => {
      console.log('Image URI: ' + image);
      //this.avatar = image.slice(7);
      alert("image.slice(7)="+image.slice(7));
    }, error => {
      console.log('Error: ' + error);
    });
  }

  chooseFromAlbum() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 200,
      height: 200
    };
    this.imagePicker.getPictures(options).then(images => {
      if (images.length > 1) {
        this.presentAlert();
      } else if (images.length === 1) {
        console.log('Image URI: ' + images[0]);
        //this.avatar = images[0].slice(7);
        alert("images[0].slice(7)="+images[0].slice(7));
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({title: "上传失败", message: "只能选择一张图片作为头像哦", buttons: ["确定"]});
    alert.present().then(value => {
      return value;
    });
  }
}
