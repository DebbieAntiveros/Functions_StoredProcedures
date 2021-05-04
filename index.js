const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/AntiverosGulayan_task2_1', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT e.first_name,e.last_name,e.department_id,d.department_name
        FROM employees e
        INNER JOIN departments d
        ON e.department_id = d.department_id;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/AntiverosGulayan_task2_2', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT first_name,last_name,department_name,city,state_province
        FROM locations,departments
        CROSS JOIN employees;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/AntiverosGulayan_task2_3', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT e.first_name, e.last_name, e.salary, j.grade_level
        FROM employees e
        JOIN job_grades j
        ON e.salary BETWEEN j.lowest_sal AND j.highest_sal;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});
app.get('/AntiverosGulayan_task2_4', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT e.first_name,e.last_name,e.department_id,d.department_name
        FROM employees e
        INNER JOIN departments d 
        ON e.department_id = d.department_id
        WHERE e.department_id = 40 OR e.department_id = 80
        ORDER BY department_id;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/AntiverosGulayan_task2_5', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT first_name,last_name,department_name,city,state_province
        FROM locations,departments
        CROSS JOIN employees
        WHERE first_name LIKE '%z%';`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});
app.get('/AntiverosGulayan_task2_6', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT e.first_name, e.last_name, d.department_id, d.department_name 
        FROM employees e
        RIGHT OUTER JOIN departments d
        ON e.department_id = d.department_id;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});
app.get('/AntiverosGulayan_task2_7', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT e.first_name, e.last_name, e.salary 
        FROM employees e
        JOIN employees s
        ON e.salary < s.salary 
        AND s.employee_id = 182;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/AntiverosGulayan_task2_8', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT e.first_name AS "Employee Name",m.first_name AS "Manager" 
        FROM employees e
        JOIN employees m
        ON e.manager_id = m.employee_id;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/AntiverosGulayan_task2_9', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT d.department_name , l.city , l.state_province
        FROM  departments d
        JOIN locations l
        ON  d.location_id = l.location_id;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});


app.get('/AntiverosGulayan_task2_10', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT e.first_name, e.last_name, e.department_id, d.department_name 
        FROM employees e
        LEFT OUTER JOIN departments d
        ON e.department_id = d.department_id;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/AntiverosGulayan_task2_11', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT e.first_name AS "Employee Name",
        m.first_name AS "Manager"
        FROM employees e
        LEFT OUTER JOIN employees m
        ON e.manager_id = m.employee_id;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/AntiverosGulayan_task2_12', async (req, res)=>{
    try {
        const query = await pool.query(` Display the name of the department, average salary, and the number of employees working in that department who got a commission.--
        SELECT d.department_name,
                AVG(e.salary),
                COUNT(commission_pct)
                FROM employees e
                JOIN departments d
                ON e.department_id = d.department_id
                GROUP BY d.department_name;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/AntiverosGulayan_task2_13', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT
        department_name,
        CONCAT  (first_name, ' ', last_name) AS "Full name"
        FROM
        employees,departments;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/AntiverosGulayan_task2_14', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT j.job_title ,ROUND(AVG(e.salary),0) AS "Average"
        FROM employees e 
        JOIN jobs j
        ON e.job_id = j.job_id
        GROUP BY job_title;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/AntiverosGulayan_task2_15', async (req, res)=>{
    try {
        const query = await pool.query(`SELECT c.country_name,
        l.city,
        COUNT(d.department_id)
        FROM countries c
        INNER JOIN locations l
        ON c.country_id = l.country_id
        INNER JOIN departments d
        ON l.location_id = d.location_id
        WHERE d.department_id IN (SELECT e.department_id
                            FROM employees e
                            GROUP BY e.department_id 
                            HAVING COUNT(e.department_id) >= 2)
        GROUP BY c.country_name, l.city;`);
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(5000, ()=> {
    console.log(`connected to the server`);
});