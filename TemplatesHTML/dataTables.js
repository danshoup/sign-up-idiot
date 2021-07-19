var $  = require( 'jquery' );
var dt = require( 'datatables.net' )();

$(userProfile.html).ready( function () {
    $('#eventTable').DataTable();
} );