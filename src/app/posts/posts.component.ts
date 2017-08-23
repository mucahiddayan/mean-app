import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import * as io from 'socket.io-client';

const URL = 'http://localhost:3000';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any = [];
  private socket;
  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.socket = io(URL);
    this.socket.on('new-student',(student)=>{
      this.posts.push(student);
    });
    // retrieve posts from API
    this.postsService.getAllPosts().subscribe(posts => this.posts = posts);
  }

}
