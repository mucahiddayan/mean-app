import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import {PostsService} from './posts.service';
import { StudentsService } from './students.service';
import { ChatService } from './chat.service';
import { ChatComponent } from './chat/chat.component';

const ROUTES = [
  /* {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  }, */
  {
    path:'posts',
    component: PostsComponent
  },
  {
    path:'chat',
    component:ChatComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [PostsService, StudentsService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
