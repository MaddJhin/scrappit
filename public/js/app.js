$(document).ready(function () {
   
    $('.save-btn').on("click", function (e) {
        console.log("Clicked Save Button");
        $.ajax({
            method: "POST",
            url: "/save",
            data: {
                title: $(this).data("title"),
                link: $(this).data("link")
            }
        }).done(function (data) {
            console.log(data);
        })
    });

    $('.remove-btn').on("click", function (e) {
        console.log("Clicked Remove Button");
        $.ajax({
            method: "POST",
            url: "/removePost",
            data: {
                title: $(this).data("title"),
            }
        }).done(function (data) {
            location.reload();
        });
    });

    $('#comment-save').on("click", function (e) {
        var id = $(this).data('id');

        console.log("Clicked Save Comment Button for id", id);
        $.ajax({
            method: "POST",
            url: "/comment/" + id,
            data: {
                body: $('#commentArea').val(),
            }
        }).done(function (data) {
            console.log(data);
        });
    });

    $('.note-btn').on("click", function (res, req){

        var id = $(this).data('id');

        $.ajax({
            method: "GET",
            url: "/comment/" + id,
        }).done(function (data) {
            console.log(data);
        });

        $('#comment-save').data('id', $(this).data('id'));
        console.log($('#comment-save').data('id'));

    });
    
});