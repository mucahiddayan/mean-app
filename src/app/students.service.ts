import { Injectable, OnInit } from '@angular/core';
import {Student} from './models/student';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import * as io from 'socket.io-client';


const headers    = new Headers({ 'Content-Type': 'application/json' });
const options    = new RequestOptions({ headers: headers });

@Injectable()
export class StudentsService implements OnInit {
  private socket;
  constructor(private http: Http) { }
  
  ngOnInit(){ 
    
  }
  
  create(student: Student): void{
    console.log('studentsservice.create called',student);
    let URL = 'http://localhost:3000/api/addstudent';
    this.socket = io("http://localhost:3000");
    // this.socket.emit('student-created',student);
    // let bodyString = JSON.stringify(student); // Stringify payload
    
    this.http.post(URL, student, options) // ...using post request
    .map((res:Response) => {
      res.json();      
    }).subscribe(()=>{
      this.socket.emit('student-created',student); 
    }); // ...and calling .json() on the response to return data
    // .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
  
  delete(id){
    this.socket = io("http://localhost:3000");
    let URL = 'http://localhost:3000/api/deletestudent';
    this.http.post(URL, {_id:id}) // ...using post request
    .map((res:Response) => {
      res.json();      
    }).subscribe(()=>{
      this.socket.emit('student-deleted',id);
    }); // 
  }
}
