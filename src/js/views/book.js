// views/book.js
var app = app || {};
app.BookView = Backbone.View.extend({
	tagName: 'div',
	className: 'js-contacts-list',
	template: _.template( $('#bookTemplate').html() ),
	events: {
		'click .delete': 'delContact'
	},
	delContact: function ( e ) {
		e.preventDefault();
		this.model.destroy();
		this.remove();
	},
	render: function() {
		// tmpl – это функция, которая принимает JSON-объект и возвращает html
		// мы определили this.el в tagName. Используйте $el для доступа
		// к jQuery-функции html()
		this.$el.html( this.template( this.model.toJSON() ));
		return this;
	}
});