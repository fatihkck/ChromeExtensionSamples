$(function(){
    $('#name').keyup(function(){
        $("#greet").html('Hello '+$('#name').val());
    });
});