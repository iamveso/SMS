export class StudentDetails{
    constructor({
        student_id,
        matric_no,
        firstname,
        lastname,
        level,
        dob,
        age,
        program_id,
        department_id,
        program_name,
        department_name,
        email,
        enrolled_courses, //An object containing the course name and units attached
        reg_units, //Sum of all the units for courses enrolled
    }){
        let _student_id = student_id;
        let _department_id = department_id;
        let _program_id = program_id;
        let _matric_no = matric_no;
        this.firstname = firstname;
        this.lastname = lastname;
        this.level = level;
        this.dob = dob;
        this.age = age;
        this.program_name = program_name;
        this.department_name = department_name;
        this.email = email;
        this.enrolled_courses = new Set(enrolled_courses);
        this.reg_units = reg_units;


        this._getStudentID = () => _student_id;
        this._getDepartmentID = () => _department_id;
        this._getProgramID = () => _program_id;
        this._getMatricNo = () => _matric_no;
    }

    isPopulated(){ //is true if all values are truthy and false otherwise
        return (_student_id 
            && _department_id 
            && _program_id 
            && _matric_no
            && this.firstname 
            && this.lastname 
            && this.level
            && this.dob
            && this.age
            && this.program_name
            && this.department_name
            && this.email
            && this.enrolled_courses //Its allowed to be an empty array
            && this.reg_units) ? true : false;
    }

    getStudentID(){
        return Object.freeze({ id: this._getStudentID() });
    }
    getDepartmentID(){
        return Object.freeze({ id: this._getDepartmentID() });
    }
    getProgramID(){
        return Object.freeze({ id: this._getProgramID() });
    }
    getMatricNo(){
        return Object.freeze({ id: this._getMatricNo() });
    }
}