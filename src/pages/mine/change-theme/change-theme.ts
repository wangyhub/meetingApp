import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ThemeProvider } from '../../../providers/theme/theme';
/**
 * Generated class for the ChangeThemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-theme',
  templateUrl: 'change-theme.html',
})
export class ChangeThemePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private theme: ThemeProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeThemePage');
  }

  changeColor(color){
    window.localStorage.setItem("color", color);
    this.theme.setActiveTheme(color);
  }
}
