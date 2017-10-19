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
        })
    })
    
});