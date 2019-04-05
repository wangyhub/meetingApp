import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public localMsg = {
    userName: '',
    meetingName: ''
  }
  public messageShow = '';
  constructor(public navCtrl: NavController) {
    let userName = window.localStorage.getItem("userName");
    if(userName!='' && userName!=null){
      this.localMsg.userName = userName+'，';
    }
    this.localMsg.meetingName = window.localStorage.getItem("meetingName");
    //设置消息图表
    this.messageShow = 'bar-message-have';
  }

}
