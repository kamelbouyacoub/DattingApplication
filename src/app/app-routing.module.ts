import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './members/lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './members/messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedHangesGuard } from './_guards/prevent-unsaved-hanges.guard';
import { MemberDetailedResolver } from './_resolvers/member-details.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', runGuardsAndResolvers: 'always', canActivate:[AuthGuard], children:[
      {path: 'members', component: MemberListComponent},
      {path: 'members/:username', component: MemberDetailComponent, resolve:{member: MemberDetailedResolver}},
      {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedHangesGuard]},
      {path: 'list', component: ListsComponent},
      {path: 'messages', component: MessagesComponent}
  ]}, 
  {path: 'errors', component: TestErrorsComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
