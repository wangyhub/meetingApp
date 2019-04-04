import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

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
        console.log("设置")
        this.storage.set('isLogin', true);
        console.log(this.storage.get('isLogin'))
        this.rootPage = TabsPage;
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
