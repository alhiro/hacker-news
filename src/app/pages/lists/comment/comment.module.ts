import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared';

import { CommentComponent } from './comment.component';

@NgModule({
  declarations: [CommentComponent],
  exports: [CommentComponent],
  imports: [CommonModule, TranslateModule, SharedModule, IonicModule],
})
export class CommentModule {}
