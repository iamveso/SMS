"use strict"

export class Student {
    constructor({
      student_id,
      matric_no,
      firstname,
      lastname,
      level,
      dob,
      email,
      age,
      program_name,
      department_name,
      enrolled_courses,
    }) {

      //Properties
      let _student_id = student_id; //private
      this.matric_no = matric_no;
      this.firstname = firstname;
      this.lastname = lastname;
      this.level = level;
      this.dob = dob;
      this.program_name = program_name;
      this.department_name = department_name;
      this.email = email;
      this.age = age;
      this.enrolled_courses = enrolled_courses;

      //Methods
      this._getStudentID = () => _student_id;  
    }

    getStudentID() {
      return Object.freeze({id: this._getStudentID()})
    }
  }

  export class EnrollmentData {
    constructor({
      student_id,
      course_id,
      enrollment_date,
      semester
    }){
      this.student_id = student_id;
      this.course_id = course_id;
      this.enrollment_date = enrollment_date;
      this.semester = semester;
    }

    isSet() { //This assumes no id can be 0 and semester CANNOT be an empty string
      return this.student_id && this.course_id && this.enrollment_date && this.semester;
    }
    verifySemester() {
      if(this.semester == "First" || this.semester == "Second"){
        return true;
      }else{
        false;
      }
    }
  }