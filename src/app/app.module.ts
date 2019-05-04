import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PostsComponent } from './posts/posts.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PostService} from './services/post.service';
import {RouterModule} from '@angular/router';
import {UserService} from './services/user.service';
import { SigninComponent } from './auth/signin/signin.component';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from './services/authentcation/authentication.service';
import {AuthGuard} from './shared/auth-guard.service';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import {RequestInterceptor} from './shared/request-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PostsComponent,
    SigninComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Import HttpClientModule to use it to fetch data
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [PostService, UserService, AuthenticationService, AuthGuard,
    // This is the way to declare requests interceptor
    {
      provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
