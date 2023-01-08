import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@Angular/forms';


import { PlayersRoutingModule } from './players-routing.module';
import { PlayersFormComponent } from './players-form/players-form.component';
import { PlayersListComponent } from './players-list/players-list.component';




@NgModule({
  declarations: [
    PlayersFormComponent,
    PlayersListComponent
  ],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    FormsModule
  ],exports:[
    PlayersFormComponent,
    PlayersListComponent
  ]
})
export class PlayersModule { }
