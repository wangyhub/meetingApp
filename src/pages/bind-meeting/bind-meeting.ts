import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Jsonp} from "@angular/http";

import {AppConfig} from "./../../app/app.config";
import { MeetingPromptPage } from '../meeting-prompt/meeting-prompt'; 

/**
 * Generated class for the BindMeetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bind-meeting',
  templateUrl: 'bind-meeting.html',
})
export class BindMeetingPage {
  public meetingCode = "";
  constructor(private jsonp:Jsonp,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }
  /**
   * 绑定会议
   */
  bindMeeting() {
    if(this.meetingCode == ""){
      alert("请输入会议邀请码");
      return false;
    }
    let phone = window.localStorage.getItem('phone');
    let url = AppConfig.getCurrentUrl()+"/checkMeeting?code="+this.meetingCode+"&phone="+phone+"&callback=JSONP_CALLBACK";
    let that = this;
    this.jsonp.get(url).subscribe(function(data){
      if(data['_body'].status == "200"){
        let result = data['_body'].data;
        //保存会议邀请码
        window.localStorage.setItem("meetingCode", that.meetingCode);
        //跳转到会议提示页面
        that.navCtrl.push(MeetingPromptPage, {
          meetingId: result.meetingId,
          meetingName: result.meetingName,
          sponsor: result.sponsor,
          startTime: result.startTime,
          endTime: result.endTime
        });
      }else{
        alert(data['_body'].msg);
      }
    },function(err){

    })
  }

}
