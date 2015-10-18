// models/book.js
var app = app || {};
app.Book = Backbone.Model.extend({
	defaults: {
		coverImage: 'img/contact-icon.jpg',
		first_name: 'Не указано',
		last_name: 'Не указано',
		patromymic: 'Не указано',
		city: 'Не указано',
		street: 'Не указано',
		phone: 'Не указано',
		birthday: new Date()
	}
});
