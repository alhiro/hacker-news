import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';

@NgModule({
  declarations: [ListsComponent],
  imports: [CommonModule, TranslateModule, SharedModule, IonicModule, ListsRoutingModule],
})
export class ListsModule {}
