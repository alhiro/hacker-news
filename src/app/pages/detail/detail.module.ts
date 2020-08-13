import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';

import { CommentModule } from '../lists/comment/comment.module';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, SharedModule, IonicModule, TranslateModule, DetailRoutingModule, CommentModule],
})
export class DetailModule {}
