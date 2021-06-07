const User = require('../../models/User.js');
const passwordHash = require("password-hash")

exports.addUser = function (request, response) {
    const locals = {
        title: 'Create user',
        description: 'Create user Page Description',
        header: 'Create user',
        layout: './layouts/admin'
    };
    response.render('backend/users/create', locals);
};
exports.updateUser = function (request, response) {

    const locals = {
        title: 'Update user',
        description: 'Update user Page Description',
        header: 'Update user',
        layout: './layouts/admin'
    };
    let user = {
        name: request.body.name,
        email: request.body.email,
        phone: request.body.phone
    }
    let id = {id: request.body.id}
    User.UpdateUser(user, id).then((result) => {
        locals.data = result;
        response.redirect('/admin/users');
    });
};
exports.Changepass = function (request,response){
    let user = {
        password: passwordHash.generate(request.body.password)
    }
    let id = {
        id: request.body.id,
    };
    let eldpas = request.body.oldpas;
    let eldpass = request.body.oldpass;
    if(passwordHash.verify(eldpass,eldpas)===true) {
        User.ChPass(user, id).then((result) => {
            console.log(result);
            response.redirect('/admin/users')
        })
    }else{
        response.send('Oops Sorry!!');
        console.log('The password is incorrect!!!!');
    }
};
exports.Pass = function (request,response){
    const locals = {
        title: 'Change User password ',
        description: 'Change User password Page Description',
        header: 'Change Password',
        layout: './layouts/admin'
    };
    //console.log(request.params.id);
    User.getUserById(request.params.id).then((result) => {
        //console.log(result[0]);
        locals.data = result[0];
        response.render('backend/users/changepass', locals);
    });
};
exports.editUser = function (request, response) {

    const locals = {
        title: 'Update user',
        description: 'Update user Page Description',
        header: 'Update user',
        layout: './layouts/admin'
    };
    User.getUserById(request.params.id).then((result) => {

        locals.data = result[0];
        response.render('backend/users/edit', locals);
    })
};

exports.deleteUser = function (request, response) {

    User.delete(request.params.id).then(
    response.redirect('/admin/users'))
};

exports.showUser = function (request, response) {

    const locals = {
        title: 'Show User',
        description: 'Show User Page Description',
        header: 'Show User',
        layout: './layouts/admin'
    };
    User.Show(request.params.id).then((result) => {
        locals.data = result[0];
        console.log(result[0]);
        response.render('backend/users/show', locals);
    })
};

exports.getUsers = function (request, response) {
    const locals = {
        title: 'Get All Users',
        description: 'Users Page Description',
        header: 'Users Page Header',
        layout: './layouts/admin'
    };
    User.getAll().then((result) => {
        locals.data = result;
        response.render('backend/users/index', locals);
    });

};
exports.createUser = function (req, res) {
    let pas = req.body.pass;
    let repas = req.body.repass;
    if (pas===repas) {
        const user = new User(
            req.body.name,
            req.body.pass,
            req.body.email,
            req.body.phone,
        );
        user.save().then( () => {
            res.redirect('/admin/users');
        })
    }else{
        const locals = {
            title: 'Create user',
            description: 'Create user Page Description',
            header: 'Create user',
            layout: './layouts/admin'
        };
        res.render('backend/users/create', locals);
    }
};
