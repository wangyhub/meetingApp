import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Jsonp } from "@angular/http";

import {AppConfig} from "./../../../app/app.config";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  public newsList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private jsonp:Jsonp) {
    console.log(this.navParams.data.id);
  }

  ionViewDidLoad() {
    //展示新闻列表
    let meetingId = window.localStorage.getItem("meetingId");
    let url = AppConfig.getCurrentUrl()+"/findNewsList?newsId="+meetingId+"&callback=JSONP_CALLBACK";
    this.jsonp.get(url).subscribe(data=>{
      let result = data['_body'].data;
      this.newsList = result;
    })
  }

}
