var application_root = __dirname,
	express = require( 'express' ), //Web framework
	path = require( 'path' ), //Utilities for dealing with file paths
	Sequelize = require('sequelize');

var sequelize = new Sequelize('contacts', 'root', '');

var User = sequelize.define('User', {
	first_name: Sequelize.STRING,
	last_name: Sequelize.STRING,
	patromymic: Sequelize.STRING,
	city: Sequelize.STRING,
	street: Sequelize.STRING,
	phone: Sequelize.STRING,
	birthday: Sequelize.DATE
});

// Создание сервера
var app = express();

// Конфигурирование сервера
app.configure( function() {
	//разбор тела запроса и заполнение request.body
	app.use( express.bodyParser() );
	//проверка request.body на переопределение HTTP-методов
	app.use( express.methodOverride() );
	//поиск маршрута по URL и HTTP-методу
	app.use( app.router );
	//где сохранить статическое содержимое
	app.use( express.static( path.join( application_root, 'src') ) );
	//показать все ошибки в разработке
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//запуск сервера
var port = 4711;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode',
	port, app.settings.env );
});

// маршруты
app.get( '/api', function( request, response ) {
	response.send( 'Library API is running' );
});

//получение списка всех пользователей
app.get( '/api/contacts', function( request, response ) {
	return User.all().then(function(users) {
		return response.send( users );
	});
});

//добавление нового пользователя
app.post( '/api/contacts', function( request, response ) {
	sequelize.sync().then(function() {
		return User.create({
	    	first_name: request.body.first_name,
	    	last_name: request.body.last_name,
	    	patromymic: request.body.patromymic,
	    	city: request.body.city,
	    	street: request.body.street,
	    	phone: request.body.phone,
	    	birthday: request.body.birthday
		});
	}).then(function( newUser ) {
		return response.send( newUser );
	});
});

//получение одного пользователя по id
app.get( '/api/contacts/:id', function( request, response ) {
	return User.findById( request.params.id )
			.then(function(user) {
				return response.send( user );
			});
});

//Обновление книги
app.put( '/api/contacts/:id', function( request, response ) {
	console.log( 'Updating book ' + request.body );
	return User.findById( request.params.id ).then(function(user) {
		
		user.birthday = request.body.birthday;

		user.save({fields: ['birthday']}).then(function(user) {
			return response.send( user );
		})
	});

});

// Удаление контакта
app.delete( '/api/contacts/:id', function( request, response ) {
	return User.findById( request.params.id ).then(function(user) {
		user.destroy().then(function() {
    		return response.send( '' );
  		})
	});
});