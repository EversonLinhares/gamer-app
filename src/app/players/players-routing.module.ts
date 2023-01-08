import { LayoutComponent } from './../layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersFormComponent } from './players-form/players-form.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { AuthGuard } from '../auth.guard'


const routes: Routes = [
  { path: 'players' , component: LayoutComponent,
     canActivate: [ AuthGuard ],
    children: [
    { path: 'form', component: PlayersFormComponent },
    { path: 'form/:id', component: PlayersFormComponent },
    { path: 'list', component: PlayersListComponent },
    { path: '', redirectTo: '/players/list', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule { }
