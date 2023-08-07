const route = (app) => {
    app.use('/api/v1/questions', require('./questions.route'));
}

module.exports = route;