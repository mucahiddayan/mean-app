import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts.service';
import { StudentsService } from './students.service';
import { ChatService } from './chat.service';
import { ChatComponent } from './chat/chat.component';
import { StudentComponent } from './student/student.component';

const ROUTES = [
  /* {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  }, */
  {
    path:'addstudent',
    component: StudentComponent
  },
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
    ChatComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [PostsService, StudentsService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
