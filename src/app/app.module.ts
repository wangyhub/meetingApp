import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MinePage } from '../pages/mine/mine';  //我的
import { BindMeetingPage } from '../pages/bind-meeting/bind-meeting'; //绑定会议
import { MeetingPromptPage } from '../pages/meeting-prompt/meeting-prompt'; //会议提示

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule  } from '@ionic/storage';
import { HttpModule, JsonpModule } from '@angular/http';

import { Camera } from '@ionic-native/camera';  //相机插件
import { File } from '@ionic-native/file';  //用于操作文件、目录插件
import { FileTransfer } from '@ionic-native/file-transfer'; //上传和下载文件插件
import { ImagePicker } from '@ionic-native/image-picker';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MinePage,
    BindMeetingPage,
    MeetingPromptPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true', //隐藏全部子页面 tabs
      backButtonText: '' /*配置返回按钮*/
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MinePage,
    BindMeetingPage,
    MeetingPromptPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    File,
    ImagePicker,
    FileTransfer
  ]
})
export class AppModule {}
