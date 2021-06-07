const connection = require('../config/db.js');
module.exports = class Course{
    course = [];
    constructor(name, icon,time,type) {

        this.name = name;
        this.icon = icon;
        this.type = type;
        this.time = time;
        this.course.push(this.time);
        this.course.push(this.name);
        this.course.push(this.icon);
        this.course.push(this.type);
    }


        save(){
            return new Promise((res, rej) => {
                let sql = `insert into courses(time, name,icon,type)
                       values (?, ?, ?, ?)`;
                connection.query(sql, this.course)
                    .then(result => {
                        // console.log(result[0].insertId)
                        res(result)
                    })
                    .catch(err => {
                        console.log("err", err);
                    })
            })

        }
    static getAll() {
        let msg = "dont have any courses"
        return new Promise((res, rej) => {
            let sql = `select * from courses `;
            connection.query(sql)
                .then(result => {

                    if (result[0].length > 0) {
                        res(result[0])
                    }
                    res(msg)
                })
                .catch(err => {
                    console.log("err", msg);
                })
        })
        // return users;
    }
    static UpdateCourse(user, id) {
        let msg = !1;

        return new Promise((res, rej) => {
            let sql = "Update courses set  ?  where id = ?";
            connection.query(sql, [user, id.id])
                .then((result) => {

                    if (result[0].length > 0) {
                        res(result[0])
                    }
                    res(msg)
                })
                .catch(err => {
                    console.log("err", err);
                })
        })
    }
        static getCourseById(id) {
        let msg = !1;
        return new Promise((res, rej) => {
            let sql = `select * from courses where id = ?`;
            connection.query(sql, [id])
                .then((result) => {
                    if (result[0].length > 0) {
                        res(result[0])
                    }
                    res(msg)
                })
                .catch(err => {
                    console.log("err", msg);
                })
        })
    }
    static delete(id){

        return new Promise ((res,rej)=>{
            let del = `delete from courses where id = ?`;
            connection.query(del,[id])
                .then(result=>{
                    if (result[0].length > 0) {
                        res(result[0])
                    }
                }).catch(err=>console.log(err));

        })
    }
    static Show(id) {

        return new Promise((res, rej) => {
            let sql = `select * from courses where id = ?`;
            connection.query(sql, [id])
                .then((result) => {
                    res(result[0]);
                })
                .catch(err => {
                    console.log(err);
                })
        })
    }
};
