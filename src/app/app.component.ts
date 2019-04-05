import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { BindMeetingPage } from '../pages/bind-meeting/bind-meeting';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {

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
  }
}
