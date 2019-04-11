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
import { NewsPage } from '../pages/home/news/news'; //新闻列表
import { LocationPage } from '../pages/mine/location/location'; //定位当前位置
import { ChangeThemePage } from '../pages/mine/change-theme/change-theme';  //改变主题
import { ScanPage } from '../pages/mine/scan/scan';  //扫一扫

import { ThemeProvider } from '../providers/theme/theme';  //自定义主题

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule  } from '@ionic/storage';
import { HttpModule, JsonpModule } from '@angular/http';

import { Camera } from '@ionic-native/camera';  //相机插件
import { File } from '@ionic-native/file';  //用于操作文件、目录插件
import { FileTransfer } from '@ionic-native/file-transfer'; //上传和下载文件插件
import { ImagePicker } from '@ionic-native/image-picker'; //相册操作插件
import { Geolocation } from '@ionic-native/geolocation';  //GPS定位
import { QRScanner } from '@ionic-native/qr-scanner'; //扫一扫

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
    MeetingPromptPage,
    NewsPage,
    LocationPage,
    ChangeThemePage,
    ScanPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true', //隐藏全部子页面 tabs
      iconMode: 'ios',
      mode: 'ios',
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
    MeetingPromptPage,
    NewsPage,
    LocationPage,
    ChangeThemePage,
    ScanPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    File,
    ImagePicker,
    FileTransfer,
    Geolocation,
    ThemeProvider,
    QRScanner
  ]
})
export class AppModule {}
