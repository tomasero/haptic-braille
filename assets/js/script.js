var 
lightGrey = '#ecf0f1',
darkGrey = '#818892',
green = '#78c272',
itemColor = 'rgb(76, 87, 101)',
letters = {
      vowels: 'aeiou',
      consonants: 'bcdfg',
      numbers: '1234567890',
      punctuation: '. A!:'
};

$(document).ready(function() {
    
    //Start of application
    
    $('#start-button').click(showMenu);
    
    //Braille translator animation start
    
    $('#buttons-container .start').click(function() {
        var bgColor =  $(this).css('background-color');
        if (bgColor == itemColor) {
            $(this).addClass('start-active');
            start($(this));
        } 
    });
    
    //Go back to submenu
    
    $('#buttons-container .back').click(function() {
        var bgColor =  $(this).css('background-color'),
            back = $(this);
        if (bgColor == itemColor) {
            back.addClass('back-active');
        }
        back.parent().find('.start').removeClass('start-active');
        hideLearn();
        setTimeout(function() {
            showSubmenu($('#top-bar #subtitle').text());
            back.removeClass('back-active');
        }, 500);
    });
    
    $('#menu-container .item').click(function() {
        var title = $(this).find($('.name')).text().trim();
        $('#menu-container').fadeOut(500);
        setTimeout(function() {
            showSubmenu(title);
        }, 500);
    });
    
    //Option
    
    $('#submenu-buttons-container .item').click(function() {
        var title = $('#top-bar #subtitle').text();
        var text = letters[title.toLowerCase()];
        $('#submenu-container').fadeOut(500);
        setTimeout(function() {
            showLearn(text);
        }, 500);
    });
    
    $('#submenu-back-container .back').click(function() {
        hideSubmenu();
        setTimeout(function() {
            $('#menu-container').fadeIn(500);
        }, 500);
    });
    
});

function showMenu() {
    $('#intro').fadeOut(500);
    setTimeout(function() {
        $('#top-bar').slideDown(500);
        $('#menu-container').fadeIn(500);
    }, 500);
}

function showSubmenu(title) {
    $('#top-bar #subtitle').text(title);
    $('#top-bar #subtitle').fadeIn(500);
    $('#top-bar #divisor').fadeIn(500);
    $('#submenu-container').fadeIn(500);
}

function hideSubmenu() {
    $('#top-bar #subtitle').fadeOut(500);
    $('#top-bar #divisor').fadeOut(500);
    $('#submenu-container').fadeOut(500);
}

function showLearn(text) {
    setup(text);
    $('#letters-container').fadeIn(500);
    $('#buttons-container').fadeIn(500);
    $('#braille-container').fadeIn(500);
}

function hideLearn() {
    reset();
    $('#letters-container').fadeOut(500);
    $('#buttons-container').fadeOut(500);
    $('#braille-container').fadeOut(500);
}