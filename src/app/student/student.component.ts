import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnChanges {
  studentForm: FormGroup;
  submitted = false;
  students = [];
  isSave = false;
  studentId: number;
  firstName: any;
  lastName: any;
  address: any;
  school: any;
  email: any;
  telephone: any;
  mobileTelephone: any;
  age: any;
  isUpdate = false;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      studentId: [''],
      firstName: [''],
      lastName: [''],
      address: [''],
      school: [''],
      email: ['',Validators.required],
      telephone: [''],
      mobileTelephone: [''],
      age: ['']
    });
    this.getStudentList();
  }

  ngOnChanges() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.studentForm.controls; }

  // form submit
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.studentForm.invalid) {
      return;
    }

    this.addStudent(this.studentForm);
    this.isSave = true;
  }

  // get students list from localstorage
  getStudentList() {
    const students = localStorage.getItem('studentList');
    if (students) {
      this.students = JSON.parse(students);
    }
  }

  // Add student and edit student
  addStudent(studentForm: any) {
    this.getStudentList();
    // edit student
    if (studentForm.value.studentId > 0) {
      const student = this.students.find((x: { studentId: number; }) => x.studentId === studentForm.value.studentId);
      this.students.splice(student, 1);
      this.students.push(studentForm.value);
      this.save(this.students);
    } else {
      // save new student
      this.studentForm.value.studentId = this.students.length + 1;
      this.students.push(studentForm.value);
      this.save(this.students);
    }
  }

  // add students localstorage
  save(students: any) {
    localStorage.setItem('studentList', JSON.stringify(students));
  }

  // delete student
  deleteStudent(studentId: number) {
    const student = this.students.find((x: { studentId: number; }) => x.studentId === studentId);
    this.students.splice(student, 1);
    this.save(this.students);
    alertify.logPosition('top center').log("Completly Deleted");
  }

  // edit student
  editStudent(studentId: number) {
    this.isSave = false;
    this.isUpdate = true;
    const student = this.students.find((x: { studentId: number; }) => x.studentId === studentId);
    if (student) {
      this.studentId = student.studentId;
      this.firstName = student.firstName;
      this.lastName = student.lastName;
      this.address = student.address;
      this.school = student.school;
      this.email = student.email;
      this.telephone = student.telephone;
      this.mobileTelephone = student.mobileTelephone;
      this.age = student.age;
    }

  }
}