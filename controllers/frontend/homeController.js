exports.index = function (request, response) {
    const locals = {
        title: 'Home',
        description: 'Home Page Description',
        header: 'Home Page Header'
    };
    response.render('frontend/home', locals);
};

exports.about = function (request, response) {

    const locals = {
        title: 'About',
        description: 'About Page Description',
        header: 'About Page Header'
    };
    response.render('frontend/about', locals);
};

exports.contact = function (req, res) {
    const locals = {
        title: 'Contact',
        description: 'Contact Page Description',
        header: 'Contact Page Header'
    };
    res.render('frontend/contact', locals);
};
