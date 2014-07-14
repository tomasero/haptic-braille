var lightGrey = '#ecf0f1';
var darkGrey = '#818892';
var green = '#78c272';
var red = '#de6868';
var itemColor = 'rgb(76, 87, 101)';

$(document).ready(function() {
    $('#buttons-container .start').click(function() {
        var bgColor =  $(this).css('background-color');
        if (bgColor == itemColor) {
            $(this).addClass('start-active');
            setup($(this));
            translate();
        } 
        else {
            $(this).removeClass('start-active');
        }
        $(this).parent().find('.stop').removeClass('stop-active');
        $(this).parent().find('.restart').removeClass('restart-active');
    });
    $('#buttons-container .stop').click(function() {
        var bgColor =  $(this).css('background-color');
        if (bgColor == itemColor) {
            $(this).addClass('stop-active');
        } else {
            $(this).removeClass('stop-active');
        }
        $(this).parent().find('.start').removeClass('start-active');
        $(this).parent().find('.restart').removeClass('restart-active');
    });
    $('#buttons-container .restart').click(function() {
        var bgColor =  $(this).css('background-color');
        if (bgColor == itemColor) {
            $(this).addClass('restart-active');
        } else {
            $(this).removeClass('restart-active');
        }
        $(this).parent().find('.start').removeClass('start-active');
        $(this).parent().find('.stop').removeClass('stop-active');
    });
});