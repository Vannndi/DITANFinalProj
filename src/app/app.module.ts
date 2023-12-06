import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  
    { path: '', redirectTo: 'post-list', pathMatch: 'full' },
    { path: 'post-list', component: PostListComponent },
    { path: 'post-add', component: PostEditComponent },
    { path: 'settings', component: SettingsComponent }, // New route for SettingsComponent
    { path: 'authentication', component: AuthComponent },
    { path: 'post-edit/:index', component: PostEditComponent },

]
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    PostComponent,
    PostListComponent,
    PostEditComponent,
    SettingsComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }