  import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
  import { Student } from '../models/student';
  import { StudentsService } from '../students.service';
  import { FormGroup , FormControl } from '@angular/forms';
  
  @Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.css']
  })
  export class StudentComponent implements OnInit {
    // @Input() student:Student;
    
    studentForm = new FormGroup({
      name : new FormControl(),
      age: new FormControl(),
      city: new FormControl(),
      sex : new FormControl(),
      street : new FormControl(),
      gpa: new FormControl()
    });
    
    

    constructor(private studentsService: StudentsService) { }
    
    ngOnInit() {
    }
    
    create(){
      // this.studentsService.create();
      console.log(this.studentForm);
    }
    
  }
  