"use strict";

export class EnrollmentData {
  constructor({ student_id, course_id, enrollment_date, semester }) {
    this.student_id = student_id;
    this.course_id = course_id;
    this.enrollment_date = enrollment_date;
    this.semester = semester;
  }

  isSet() {
    //This assumes no id can be 0 and semester CANNOT be an empty string
    return (
      this.student_id && this.course_id && this.enrollment_date && this.semester
    );
  }
  verifySemester() {
    if (this.semester == "First" || this.semester == "Second") {
      return true;
    } else {
      false;
    }
  }
}

export class CourseData {
  constructor({course_name, course_code, required_level, units }) {
    this.course_name = course_name;
    this.course_code = course_code;
    this.required_level = required_level;
    this.units = units;
  }

  isSet() {
    //This assumes no id can be 0 and semester CANNOT be an empty string
    return (
      this.course_name && this.course_code && this.required_level && this.units != undefined
    );
  }
}
