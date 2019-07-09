import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit, OnChanges {

  teacherForm: FormGroup;
  submitted = false;
  teachers = [];
  isSave = false;
  teacherId: number;
  firstName: any;
  lastName: any;
  address: any;
  email: any;
  mobileTelephone: any;
  isUpdate = false;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.teacherForm = this.formBuilder.group({
      teacherId: [''],
      firstName: [''],
      lastName: [''],
      address: [''],
      email: [''],
      mobileTelephone: ['']
    });
    this.getTeacherList();
  }

  ngOnChanges() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.teacherForm.controls; }

  // form submit
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.teacherForm.invalid) {
      return;
    }

    this.addTeacher(this.teacherForm);
    this.isSave = true;
  }

  // get teacher list from localstorage
  getTeacherList() {
    const teachers = localStorage.getItem('teachersList');
    if (teachers) {
      this.teachers = JSON.parse(teachers);
    }
  }

  // Add teacher and edit teacher
  addTeacher(teacherForm: any) {
    this.getTeacherList();
    // edit teacher
    if (teacherForm.value.teacherId > 0) {
      const teacher = this.teachers.find((x: { teacherId: number; }) => x.teacherId === teacherForm.value.teacherId);
      this.teachers.splice(teacher, 1);
      this.teachers.push(teacherForm.value);
      this.save(this.teachers);
    } else {
      // save new teacher
      this.teacherForm.value.teacherId = this.teachers.length + 1;
      this.teachers.push(teacherForm.value);
      this.save(this.teachers);
    }
  }

  // add teachers localstorage
  save(teachers: any) {
    localStorage.setItem('teachersList', JSON.stringify(teachers));
  }

  // delete teacher
  deleteTeacher(teacherId: number) {
    const teacher = this.teachers.find((x: { teacherId: number; }) => x.teacherId === teacherId);
    this.teachers.splice(teacher, 1);
    this.save(this.teachers);
    alertify.logPosition('top center').log("Completly Deleted");
  }

  // edit teacher
  editTeacher(teacherId: number) {
    this.isSave = false;
    this.isUpdate = true;
    const teacher = this.teachers.find((x: { teacherId: number; }) => x.teacherId === teacherId);
    if (teacher) {
      this.teacherId = teacher.teacherId;
      this.firstName = teacher.firstName;
      this.lastName = teacher.lastName;
      this.address = teacher.address;
      this.email = teacher.email;
      this.mobileTelephone = teacher.mobileTelephone;
    }
  }
}