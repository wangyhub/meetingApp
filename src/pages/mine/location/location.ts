import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare let BMap;

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  // 展示百度地图
  @ViewChild('mapcon') mapcon: ElementRef;
  longitude:any; //经度
  latitude:any;//纬度
  pi = 3.14159265358979324;
  a = 6378245.0;
  ee = 0.00669342162296594323;
  x_pi = 3.14159265358979324*3000.0/180.0;
  constructor(
        private geolocation: Geolocation,
        public navCtrl: NavController, 
        public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude,resp.coords.longitude);
      alert(resp.coords.latitude+"   "+resp.coords.longitude);
      

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      let map = new BMap.Map(this.mapcon.nativeElement, { enableMapClick: true });//创建地图实例
      map.enableScrollWheelZoom(true); //启动滚轮放大缩小，默认禁用
      map.enableContinuousZoom(true); //连续缩放效果，默认禁用
      let point = new BMap.Point(this.longitude, this.latitude);//坐标可以通过百度地图坐标拾取器获取
      
      let resultPoints = this.GpsToBaiduPoints(point);
      
      map.centerAndZoom(resultPoints[0],14);//设置中心和地图显示级别
      //map.addControl(new BMap.MapTypeControl());
      // map.setCurrentCity("广州");
      //let sizeMap = new BMap.Size(10, 80);//显示位置
      //map.addControl(new BMap.NavigationControl());
      //map.enableScrollWheelZoom(false);//启动滚轮放大缩小，默认禁用
      //map.enableContinuousZoom(true);//连续缩放效果，默认禁用
      //map.disableDragging(true);     //禁止拖拽
      //map.clearOverlays();
      //let myIcon = new BMap.Icon("assets/img/icon/map.png",new BMap.Size(16,31));
      let marker = new BMap.Marker(resultPoints[0]);
      map.addOverlay(marker);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    
  }


  //默认提供一个接口直接调用
  GpsToBaiduPoints(points){
  var resultPoints = [];
  var _t = this.wgs2bd(points.lat,points.lng);
  var _BPoint = new BMap.Point(_t[1], _t[0]);
  alert("_t[1]="+_t[1]+"  _t[0]="+_t[0]);
  resultPoints.push(_BPoint);
  return resultPoints;
}

//////////////////////////////////////////
//////////////转换核心代码////////////////
//////////////////////////////////////////



//世界大地坐标转为百度坐标
wgs2bd(lat,lon) {
  var wgs2gcjR = this.wgs2gcj(lat, lon);
  var gcj2bdR = this.gcj2bd(wgs2gcjR[0], wgs2gcjR[1]);
  return gcj2bdR;
}

gcj2bd(lat,lon) {
  var x = lon, y = lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
  var bd_lon = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  var result = [];
  result.push(bd_lat);
  result.push(bd_lon);
  return result;
}

 bd2gcj(lat,lon) {
  var x = lon - 0.0065, y = lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
  var gg_lon = z * Math.cos(theta);
  var gg_lat = z * Math.sin(theta);
  var result = [];
  result.push(gg_lat);
  result.push(gg_lon);
  return result;
}

wgs2gcj(lat,lon) {
  var dLat = this.transformLat(lon - 105.0, lat - 35.0);
  var dLon = this.transformLon(lon - 105.0, lat - 35.0);
  var radLat = lat / 180.0 * this.pi;
  var magic = Math.sin(radLat);
  magic = 1 - this.ee * magic * magic;
  var sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * this.pi);
  dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * this.pi);
  var mgLat = lat + dLat;
  var mgLon = lon + dLon;
  var result = [];
  result.push(mgLat);
  result.push(mgLon);
  return result;
}

transformLat(lat,lon) {
  var ret = -100.0 + 2.0 * lat + 3.0 * lon + 0.2 * lon * lon + 0.1 * lat * lon + 0.2 * Math.sqrt(Math.abs(lat));
  ret += (20.0 * Math.sin(6.0 * lat * this.pi) + 20.0 * Math.sin(2.0 * lat * this.pi)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lon * this.pi) + 40.0 * Math.sin(lon / 3.0 * this.pi)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lon / 12.0 * this.pi) + 320 * Math.sin(lon * this.pi  / 30.0)) * 2.0 / 3.0;
  return ret;
}

transformLon(lat,lon) {
  var ret = 300.0 + lat + 2.0 * lon + 0.1 * lat * lat + 0.1 * lat * lon + 0.1 * Math.sqrt(Math.abs(lat));
  ret += (20.0 * Math.sin(6.0 * lat * this.pi) + 20.0 * Math.sin(2.0 * lat * this.pi)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * this.pi) + 40.0 * Math.sin(lat / 3.0 * this.pi)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lat / 12.0 * this.pi) + 300.0 * Math.sin(lat / 30.0 * this.pi)) * 2.0 / 3.0;
  return ret;
}


}
