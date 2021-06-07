const Course = require('../../models/Course.js');


exports.addCourse = function (request, response) {
    const locals = {
        title: 'Create Course',
        description: 'Create user Page Description',
        header: 'Create user',
        layout: './layouts/admin'
    };
    response.render('backend/courses/create', locals);

};

exports.createCourse = function (req, res) {

    const course = new Course(
        req.body.name,
        req.body.icon,
        req.body.time,
        req.body.type,
    );

    course.save().then(() => {
        res.redirect("admin/courses/");
    })
};
exports.getCourses = function (request, response) {
    const locals = {
        title: 'Get All Users',
        description: 'Users Page Description',
        header: 'Users Page Header',
        layout: './layouts/admin'
    };
    Course.getAll().then((result) => {
        locals.data = result;
        response.render('backend/courses/index', locals);
    });

};
exports.updateCourse = function (request, response) {


    let course = {
        name: request.body.name,
       icon: request.body.icon,
       type: request.body.type,
       time: request.body.time,
    }
    let id = {id: request.body.id}
   Course.UpdateCourse(course, id).then((result) => {
        response.redirect("/admin/courses");
    });
};
exports.editCourse = function (request, response) {

    const locals = {
        header: 'Update courses',
        title:'Update courses',
    };

    Course.getCourseById(request.params.id).then((result) => {
       // console.log(result);
        locals.data = result[0];
        response.render('backend/courses/edit', locals);
    })
};

exports.deleteCourse = function (req,res){
    Course.delete(req.params.id).then(()=> res.redirect('/admin/courses'))
};

exports.showCourses = function (request, response) {

    const locals = {
        header: 'Show User',
        layout: './layouts/admin'
    };
    Course.Show(request.params.id).then((result) => {
        locals.data = result[0];
        console.log(result[0]);
        response.render('backend/courses/show', locals);
    })
};