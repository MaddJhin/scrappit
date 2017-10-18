$(document).ready(function () {
   
    $('#scrape-btn').on("click", function(e){
        e.preventDefault();
        $.getJSON('/scrape', function(data) {
            console.log(data);
        });
    });
    
});