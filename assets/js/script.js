var 
lightGrey = '#ecf0f1',
darkGrey = '#818892',
green = '#78c272',
itemColor = 'rgb(76, 87, 101)',
sessionState = false,
quizSession,
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
    
    $('#buttons-container #start').click(function() {
        $(this).addClass('start-active');
        learnStart($(this));
    });
    
    $('#buttons-container #practice').click(function() {
        $(this).addClass('practice-active');
        if(!sessionState) {
            quizSession = quizStart($(this));
            quizSession.send();
        }
        sessionState = true;
    });
    
    //NOTWORKING!
    
    $('#letters-container').on('click', '.letter', function() {
        if (quizValidate($(this))){ 
            if (!quizSession.send()) {
                hideLearn();
                setTimeout(showSubmenu, 500);
            }
        } else {
            quizSession.repeat();
        }
    });
    
    $('#buttons-container #back').click(function() {
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
        $('#info-menu').fadeOut(500);
        setTimeout(function() {
            showSubmenu(title);
        }, 500);
    });
    
    //Option
    
    $('#submenu-buttons-container #learn').click(function() {
        var title = $('#top-bar #subtitle').text();
        var text = letters[title.toLowerCase()];
        $('#submenu-container').fadeOut(500);
        setTimeout(function() {
            showLearn(text);
        }, 500);
    });
    
    $('#submenu-buttons-container #quiz').click(function() {
        var title = $('#top-bar #subtitle').text();
        var text = letters[title.toLowerCase()];
        $('#submenu-container').fadeOut(500);
        setTimeout(function() {
            showQuiz(text);
        }, 500);
    });
    
    $('#submenu-back-container .back').click(function() {
        hideSubmenu();
        setTimeout(function() {
            $('#info-menu').fadeIn(500);
            $('#menu-container').fadeIn(500);
        }, 500);
    });
    
});

function showMenu() {
    $('#intro').fadeOut(500);
    setTimeout(function() {
        $('#info-menu').fadeIn(500);
        $('#top-bar').slideDown(500);
        $('#menu-container').fadeIn(500);
    }, 500);
}

function showSubmenu(title) {
    $('#top-bar #subtitle').text(title);
    $('#top-bar #subtitle').fadeIn(500);
    $('#top-bar #divisor').fadeIn(500);
    $('#submenu-container').fadeIn(500);
    $('#submenu-container #title').text(title);
}

function hideSubmenu() {
    $('#top-bar #subtitle').fadeOut(500);
    $('#top-bar #divisor').fadeOut(500);
    $('#submenu-container').fadeOut(500);
}

function showLearn(text) {
    learnSetup(text);
    $('#letters-container').fadeIn(500);  
    $('#buttons-container').fadeIn(500);
    $('#buttons-container #start').css({'display':'inline-block'});
    $('#braille-container').fadeIn(500);
    $('#letters-container').removeClass('letters-container-quiz');
}

function showQuiz(text) {
    quizSetup(text);
    $('#info-quiz').fadeIn(500);
    $('#letters-container').addClass('letters-container-quiz');
    $('#letters-container').fadeIn(500);
    $('#buttons-container').fadeIn(500);
    $('#buttons-container #practice').css({'display':'inline-block'});
}

function hideLearn() {
    reset();
    sessionState = false;
    $('#info-quiz').fadeOut(500);
    $('#letters-container').fadeOut(500);
    $('#buttons-container').fadeOut(500);
    $('#braille-container').fadeOut(500);
    $('#buttons-container #start').fadeOut(500);
    $('#buttons-container #practice').fadeOut(500);
}