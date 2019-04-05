import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Jsonp} from "@angular/http";

import {AppConfig} from "./../../app/app.config";
import { TabsPage } from '../tabs/tabs';
import { BindMeetingPage } from '../bind-meeting/bind-meeting';
/**
 * Generated class for the MeetingPromptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meeting-prompt',
  templateUrl: 'meeting-prompt.html',
})
export class MeetingPromptPage {
  public meetingMsg = {
    meetingId: '',
    meetingName: '',
    sponsor: '',
    startTime: '',
    endTime: ''
  };
  constructor(private jsonp:Jsonp, public navCtrl: NavController, public navParams: NavParams) {
    this.meetingMsg.meetingId = this.navParams.get("meetingId");
    this.meetingMsg.meetingName = this.navParams.get("meetingName");
    this.meetingMsg.sponsor = this.navParams.get("sponsor");
    this.meetingMsg.startTime = this.navParams.get("startTime");
    this.meetingMsg.endTime = this.navParams.get("endTime");
  }

  ionViewDidLoad() {
  
  }
  /**
   *  点击确定进入主页面
   * */
  sure() {
    let phone = window.localStorage.getItem("phone");
    let meetingCode = window.localStorage.getItem("meetingCode");
    let url = AppConfig.getCurrentUrl()+"/bindingCode?code="+meetingCode+"&phone="+phone+"&callback=JSONP_CALLBACK";
    let that = this;
    this.jsonp.get(url).subscribe((data)=>{
      if(data['_body'].status == "200"){
        window.localStorage.setItem("meetingId", that.meetingMsg.meetingId);
        window.localStorage.setItem("meetingName", that.meetingMsg.meetingName);
        //跳转到主页面
        that.navCtrl.push(TabsPage);
      }
    })
  }

  /**
   * 点击取消返回绑定会议页面
   */
  notSure() {
    this.navCtrl.push(BindMeetingPage);
  }
}
