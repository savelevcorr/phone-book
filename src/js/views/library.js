// views/library.js

var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: '#contacts',
	events: {
		'click #add': 'addContact'
	},
	addContact: function (e) {	
		e.preventDefault();
		var formData = {};
		$('#addContact input').each(function (i, el) {
			if( $(el).val() !== '' ) {
				
				if( el.id === 'birthday' ) {
					formData[ el.id ] = new Date( $(el).val() ).getTime();
				} else {
					formData[el.id] = $(el).val();
				}
			}
			$(this).val('');
		});
		this.collection.create( formData );
	},

	initialize: function( initialBooks ) {
		this.collection = new app.Library( initialBooks );
		this.collection.fetch({reset: true});
		this.render();

		this.listenTo( this.collection, 'add', this.renderBook );
		this.listenTo( this.collection, 'reset', this.render );
	},

	render: function() {
		this.collection.each(function( item ) {
			this.renderBook( item );
		}, this );
	},

	renderBook: function( item ) {
		var bookView = new app.BookView({
			model: item
		});
		this.$el.append( bookView.render().el );
	}
});
