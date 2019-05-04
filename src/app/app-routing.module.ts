import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PostsComponent} from './posts/posts.component';
import {SigninComponent} from './auth/signin/signin.component';
import {AuthGuard} from './shared/auth-guard.service';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'posts', component: PostsComponent, canActivate: [AuthGuard]},
  {path: 'singin', component: SigninComponent},
  {path: '404', component: NotFoundPageComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
