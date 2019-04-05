import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetingPromptPage } from './meeting-prompt';

@NgModule({
  declarations: [
    MeetingPromptPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetingPromptPage),
  ],
})
export class MeetingPromptPageModule {}
