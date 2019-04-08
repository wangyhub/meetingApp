import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Jsonp } from "@angular/http";
import { Storage } from '@ionic/storage';


import { TabsPage } from '../tabs/tabs';
import { BindMeetingPage } from '../bind-meeting/bind-meeting';
import {AppConfig} from "./../../app/app.config";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  params = {
    usertel: '',
    newpass: '',
    vcode: '',
    sure_pwd: ''
  }
  codeParam = {
      fromflag: 2,
      usertel: ""
  }
  constructor(private jsonp:Jsonp,
                  public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
   
  }
  // 验证码倒计时
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }
  // 倒计时
  settime() {
    if (this.verifyCode.countdown == 1) {
      this.verifyCode.countdown = 60;
      this.verifyCode.verifyCodeTips = "获取验证码";
      this.verifyCode.disable = true;
      return;
    } else {
      this.verifyCode.countdown--;
    }

    this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + ")";
    setTimeout(() => {
      this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + ")";
      this.settime();
    }, 1000);
  }

  getCode() {
    if (this.params.usertel == '') {
      console.debug("请填写手机号!");
      alert("请填写手机号!");
      return;
    }
    //发送验证码成功后开始倒计时
    this.verifyCode.disable = false;
    this.settime();
  }

  doReset() {
    //this.params.usertel = this.codeParam.usertel;

    if (this.params.usertel == "") {
      console.debug("请输入手机号");
      alert("请输入手机号");
      return;
    }

    if (this.params.vcode == "") {
      console.debug("请输入验证码");
      alert("请输入验证码");
      return;
    }

    //请求后台验证登录
    let url = AppConfig.getCurrentUrl()+"/checkUser?phone="+this.params.usertel+"&callback=JSONP_CALLBACK";
    let that = this;
    this.jsonp.get(url).subscribe(data=>{
      //let result = data['_body'].data;
      if(data['_body'].status == "200"){
        let user = data['_body'].data;
        that.storage.set('isLogin', true);
        window.localStorage.setItem('userId', user.userId);
        window.localStorage.setItem('userName', user.userName);
        window.localStorage.setItem('phone', user.phone);
        //如果用户没有根据邀请码绑定会议，那么跳转到绑定会议页面
        if(user.meetingId==""){
          that.navCtrl.push(BindMeetingPage);
        }else{
          window.localStorage.setItem('meetingId', user.meetingId);
          window.localStorage.setItem('meetingName', user.meetingName);
          that.navCtrl.push(TabsPage);
        }
      }
      
    },err=>{
      alert("网络异常");
    });
    
  }
}
