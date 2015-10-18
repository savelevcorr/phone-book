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

            $('#birthday').datepicker();
        });
    }
});
