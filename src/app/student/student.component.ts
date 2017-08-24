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
    
    /* studentForm = new FormGroup({
      name : new FormControl(),
      age: new FormControl(),
      city: new FormControl(),
      sex : new FormControl(),
      street : new FormControl(),
      gpa: new FormControl()
    }); */
    student:Student;
    

    constructor(private studentsService: StudentsService) { }
    
    ngOnInit() {
      this.student = new Student();
      this.student.id = 0;
      this.student.name = 'Maria';
      this.student.sex = 'F';
      this.student.age = 23;
      this.student.gpa = 'uk';
      this.student.city = 'Berlin';
      this.student.street = 'Berlinerstr.';
    }
    
    create(val,valid){
      this.studentsService.create(val);
      // console.log(this.studentForm);
      console.log(val,valid);
    }
    
  }
  