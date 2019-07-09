import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnChanges, AfterViewInit {

  courseForm: FormGroup;
  submitted = false;
  courses = [];
  isSave = false;
  courseId: number;
  teacherName: string;
  courseName: string;
  duration: any;
  courseFee: any;
  description: string;
  isUpdate = false;
  teachers = [];
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      courseId: [''],
      courseName: [''],
      teacherName: [''],
      duration: [''],
      courseFee: [''],
      description: ['']
    });
    this.getCourseList();
    this.getTeacherList();
  }

  ngAfterViewInit(): void {
    this.getTeacherList();
  }

  ngOnChanges() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.courseForm.controls; }


  // form submit
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.courseForm.invalid) {
      return;
    }

    this.addCourse(this.courseForm);
    this.isSave = true;
  }

  // get courses list from localstorage
  getCourseList() {
    const courses = localStorage.getItem('courseList');
    if (courses) {
      this.courses = JSON.parse(courses);
    }
  }

  // Add course and edit course
  addCourse(courseForm: any) {
    this.getCourseList();
    // edit course
    if (this.courseForm.value.courseId > 0) {
      const course = this.courses.find((x: { courseId: number; }) => x.courseId === courseForm.value.courseId);
      this.courses.splice(course, 1);
      this.courses.push(courseForm.value);
      this.save(this.courses);
    } else {
      // save new course
      this.courseForm.value.courseId = this.courses.length + 1;
      this.courses.push(courseForm.value);
      this.save(this.courses);
    }
  }

  // add students localstorage
  save(courses: any) {
    localStorage.setItem('courseList', JSON.stringify(courses));
  }
  // delete course
  deleteCourse(courseId: number) {
    const course = this.courses.find((x: { courseId: number; }) => x.courseId === courseId);
    this.courses.splice(course, 1);
    this.save(this.courses);
    alertify.logPosition('top center').log("Completly Deleted");
  }

  // edit Course
  editCourse(courseId: number) {
    this.isSave = false;
    this.isUpdate = true;
    const course = this.courses.find((x: { courseId: number; }) => x.courseId === courseId);
    if (course) {
      this.courseId = course.studentId;
      this.courseName = course.courseName;
      this.teacherName = course.teacherName;
      this.duration = course.duration;
      this.courseFee = course.courseFee;
      this.description = course.description;
    }

  }

  getTeacherList() {
    const teachers = localStorage.getItem('teachersList');
    if (teachers) {
      this.teachers = JSON.parse(teachers);
    }
  }
}