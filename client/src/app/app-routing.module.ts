import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { KnownWordsComponent } from './known-words/known-words.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
{path:'', component: HomeComponent},
{
  path: '',
  runGuardsAndResolvers:'always',
  canActivate:[AuthGuard],
  children:
  [
    {path:'main', component: ListsComponent},
    {path:'words', component: MessagesComponent},
    {path:'knownWords', component:KnownWordsComponent}, 
  ]
},
{path: 'errors', component:TestErrorsComponent},
{path: 'not-found', component:HomeComponent},
{path: 'server-error', component:ServerErrorComponent},
{path:'**', component:NotFoundComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
