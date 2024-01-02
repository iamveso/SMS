-- INSERT INTO enrollments (student_id, course_id, enrollment_date, semester)
-- VALUES
--     ('bd3fda7a-9cd4-4b88-85d4-9dd0805df912', '1', '2023-01-01', 'First'),
--     ('bd3fda7a-9cd4-4b88-85d4-9dd0805df912', '2', '2023-01-01', 'First');

-- ALTER TABLE enrollments
-- ADD CONSTRAINT unique_student_course
-- UNIQUE (student_id, course_id);

-- -- DELETE FROM enrollments
-- WHERE (student_id, course_id) IN (
--    SELECT student_id, course_id
--    FROM enrollments
--    GROUP BY student_id, course_id
--    HAVING COUNT(*) > 1
-- );

SELECT * FROM enrollments;