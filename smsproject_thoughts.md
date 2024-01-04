#RENOVATION

1. When Pulling a students info (with matric number)
	It should come with the students personal info
	His departmental and program info
	His courses enrolled  	=>done

2. Implement GET for matric Number == "/students/:id" => done
	PUT for matric number => to update multiple info == "/students/:id" => done
	DELETE to delete a student which will be a soft delete == "/students/:id" => done
	POST to register a student == "students/register => done

3. Implement GET to retrieve all students in a certain level, department, program => use url query strings => done


#Enrollment

1. You should have gotten the student_id and current level department_id and program_id
	This info will be used to figure out all the courses he is eligible to register for (level is important) should be arranged by level

2. Register the student for the course which means it will be added to the enrollments db with the student_id and other info
	TODO: Implement the ability to remove courses already taken and passed from this list

#Courses
1. Api to add new courses (Should be pretty straight forward since it doesnt rely on info from elsewhere)

#Department

1. Api to add new departments (should be same as courses)
2. Get a list of all departments

#Program
1. Api to add new programs under departments (department_id is required)
2. Get a list of all programs (if there is a query string get a list of programs under that department)


#TODO:
1. Begin to think about authorization and authentication anD how it will fit with this api (include guest auth)
2. Put the db online and consider how migration will work[just to understand] (currently ooking at Flyway for this purpose)
