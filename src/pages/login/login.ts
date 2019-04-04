import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
    this.storage.set('isLogin', true);
    this.navCtrl.push(TabsPage);
  }
}
