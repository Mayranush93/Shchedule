const User = require('../../models/User.js');
exports.doLogin = function (request, response) {
    const locals = {
        title: 'Create user',
        description: 'Create user Page Description',
        header: 'Create user',
        msg: ''
    };
    response.render('backend/users/login', locals);

};
exports.dashboard = function (request, response) {
    const locals = {
        title: 'dashboard',
        description: 'Create user Page Description',
        header: 'dashboard',
        msg: '',
        layout: './layouts/admin'
    };
    response.render('backend/dashboard', locals);
};

exports.login = function (request, res) {
    let email = request.body.email;
    let password = request.body.password;

    User.checkUser(email, password).then((result) => {
        console.log(result);
        if (result)
            res.redirect('/admin/dashboard');
        else
            res.redirect('/admin');
    });

};

