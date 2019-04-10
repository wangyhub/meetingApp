import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
/*
  Generated class for the ThemeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThemeProvider {

  private theme: BehaviorSubject<String>;

  constructor() {
    // theme 是 BehaviorSubject实例
    let color = window.localStorage.getItem("color");
    if(color==null || color==''){
        color = 'blue-theme';
    }
    this.theme = new BehaviorSubject(color);
  }

  setActiveTheme(val) {
    // 改变值
    this.theme.next(val);
  }

  getActiveTheme() {
    // 观察
    return this.theme.asObservable();
  }

}
