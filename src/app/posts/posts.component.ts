import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import * as io from 'socket.io-client';
import { StudentsService } from '../students.service';

const URL = 'http://localhost:3000';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any = [];
  private socket;
  constructor(private postsService: PostsService,private studentsService: StudentsService) { }

  ngOnInit() {
    this.socket = io(URL);
    this.socket.on('new-student',(student)=>{
      this.posts.push(student);
    });
    this.socket.on('delete-student',(id)=>{
      let index = this.posts.findIndex((post)=> post._id === id);
      this.posts.splice(index,1); 
    });
    // retrieve posts from API
    this.postsService.getAllPosts().subscribe(posts => this.posts = posts);
  }

  delete(id: string){    
    this.studentsService.delete(id);    
    console.log(id);       
  }

}
