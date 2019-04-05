import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BindMeetingPage } from './bind-meeting';

@NgModule({
  declarations: [
    BindMeetingPage,
  ],
  imports: [
    IonicPageModule.forChild(BindMeetingPage),
  ],
})
export class BindMeetingPageModule {}
