const connection = require('../config/db.js');
const passwordHash = require('password-hash');
module.exports = class User {

    user = [];

    constructor(name, password, email, phone) {

        this.name = name;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.user.push(this.name);
        this.user.push(passwordHash.generate(this.password));
        this.user.push(this.email);
        this.user.push(this.phone);
    }

    save() {
        return new Promise((res, rej) => {
            let sql = `insert into users(name, password, email, phone)
                       values (?, ?, ?, ?)`;
            connection.query(sql, this.user)
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
        let msg = "dont have any users"
        return new Promise((res, rej) => {
            let sql = `select * from users `;
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
    static delete(id){

        return new Promise ((res,rej)=>{
            let del = `delete from users where id = ?`;
            connection.query(del,[id])
                .then(result=>{
                if (result[0].length > 0) {
                    res(result[0])
                }
            }).catch(err=>console.log(err));

        })
    }


    static getUserById(id) {
        let msg = !1;
        return new Promise((res, rej) => {
            let sql = `select * from users where id = ?`;
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
    static ChPass(user,id){
        let msg = !1;
         let sql = "Update users set  ?  where id = ?";
            return new Promise ((res,rej)=>{
                connection.query(sql,[user,id.id])
                    .then((result) => {
                       //console.log(result[0]);
                            res(result[0]);
                    })
                    .catch(err => {
                        console.log("err", err);
                    })
        });
    };
    static UpdateUser(user, id) {
        let msg = !1;

        return new Promise((res, rej) => {
            let sql = "Update users set  ?  where id = ?";
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
    static Show(id) {

        return new Promise((res, rej) => {
            let sql = `select * from users where id = ?`;
            connection.query(sql, [id])
                .then((result) => {
                        res(result[0]);
                })
                .catch(err => {
                    console.log(err);
                })
        })
    }

    static checkUser(email, pass) {
        let msg = !1;
        return new Promise((res, rej) => {
            let sql = `select password from users where email = ?`;
            connection.query(sql, [email])
                .then(result => {

                    if (result[0].length > 0) {
                        if (passwordHash.verify(pass, result[0][0].password )) {
                            msg = 1;
                        }
                    }
                    res(msg)
                })
                .catch(err => {
                    console.log("err", msg);
                })
        })
    }
}
