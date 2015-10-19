Modernizr.load({
    load: [
        "/js/common.js",
		"/js/models/book.js",
		"/js/collections/library.js",
		"/js/views/book.js",
		"/js/views/library.js"
    ],
    complete: function () {
        // start
        $(document).ready(function () {
          
            new app.LibraryView();

            $('#birthday').datepicker({
                format: 'mm/dd/yyyy',
                autoclose: true
            });

	    // Получаем списко городов при вводе первых букв
            $('#city').kladr({
                token: '5623b69e0a69de320f8b45fa',
                type: $.kladr.type.city,
                 
                 // Получаем список улиц в выбраном городе
                select: function( obj ){
                    $('#street').kladr({
                        parentId: obj.id,
                        type: $.kladr.type.street,
                        parentType: $.kladr.type.city
                    });
                }
            });

        });
    }
});
