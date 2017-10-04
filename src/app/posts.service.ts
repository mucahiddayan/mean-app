import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PostsService {

  constructor(private http: Http) { }

  // Get all posts from API
  getAllPosts(){
    return this.http.get('api/students').map(res=>{
      try{
        return res.json();
      }
      catch(e){
        console.log(e);
      }
    });
  }
}
