import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  light: boolean;//判断闪光灯
  frontCamera: boolean;//判断摄像头

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private qrScanner: QRScanner,
              private viewCtrl: ViewController) {
    //默认为false
    this.light = false;      
    this.frontCamera = false;
  }

  ionViewDidLoad() {    
		this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {        
        if (status.authorized) {
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            alert(text);      
            this.qrScanner.hide(); 
            scanSub.unsubscribe(); 
            this.navCtrl.pop();
          });          
          this.qrScanner.show();
        } else if (status.denied) {  
          
        } else {          
          
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  //页面可见时才执行
  ionViewDidEnter(){    
    this.showCamera();
  }  
  
  /**
   * 闪光灯控制，默认关闭
   */
  toggleLight() {    
    if (this.light) {      
      this.qrScanner.disableLight();
    } else {      
      this.qrScanner.enableLight();
    }    
    this.light = !this.light;
  }  
  
  /**
   * 前后摄像头互换
   */
  toggleCamera() {    
    if (this.frontCamera) {      
      this.qrScanner.useBackCamera();
    } else {      
      this.qrScanner.useFrontCamera();
    }    
    this.frontCamera = !this.frontCamera;
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  hideCamera() {    
    this.qrScanner.hide();//需要关闭扫描，否则相机一直开着
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  ionViewWillLeave() {    
    this.hideCamera();
  }

}
