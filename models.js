"use strict"

export class Student {
    constructor({
      student_id,
      matric_no,
      firstname,
      lastname,
      level,
      dob,
      program_id,
      department_id,
      email,
    }) {

      //Properties
      let _student_id = student_id; //private
      this.matric_no = matric_no;
      this.firstname = firstname;
      this.lastname = lastname;
      this.level = level;
      this.dob = dob;
      this.program_id = program_id;
      this.department_id = department_id;
      this.email = email;


      //Methods
      this._getStudentID = () => _student_id;  
    }

    getStudentID() {
      return Object.freeze({id: this._getStudentID()})
    }
  }