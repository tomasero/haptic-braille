var 
text = [],
pins = [],
frame,
startButton,
lettersSet = false,
stopAnimation = false,
pinCount = 6,
refreshSpeed = 1000,
caps = '000001',
number = '001111',
space = '111111',
chars = {
      a: '100000',
      b: '110000',
      c: '100100',
      d: '100110',
      e: '100010',
      f: '110100',
      g: '110110',
      h: '110010', 
      i: '010100',
      j: '010110',
      k: '101000',
      l: '111000',
      m: '101100',
      n: '101110',
      o: '101010',
      p: '111100',
      q: '111110',
      r: '111010',
      s: '011100',
      t: '011110',
      u: '101001',
      v: '111001',
      w: '010111',
      x: '101101',
      y: '101111',
      z: '101001',
      '.': '010011',
      ',': '010000',
      '!': '011010',
      ';': '011000',
      ':': '100011',
      '@': '000100',
      '&': '111101',
      '+': '001101',
      '-': '001001',
      '=': '111111',
      ' ': space
};


function setLetters(letters) {
    if (!lettersSet) {
        for (var i in letters) {
            text[i] = letters[i];
            $('#letters-container').append(
                '<div class="letter">' +
                text[i] + 
                '</div>'
            );
        }
        lettersSet = true;
    }
}

function getPins() {
      pins[0] = $('#pin1');
      pins[1] = $('#pin2');
      pins[2] = $('#pin3');
      pins[3] = $('#pin4');
      pins[4] = $('#pin5');
      pins[5] = $('#pin6');
}

function setPinOn(pin, letter) {
      pin.css({'background-color':'#4c5765'});
}

function setPinOff(pin, letter) {
      pin.css({'background-color':'white'});
}

function clearPins() {
      for (var i in pins) {
            setPinOff(pins[i]);
      }
}

function clearPinsAfterTranslation(count) {
      setTimeout(function() {
            clearPins();
            startButton.removeClass('start-active');
            resetFrame();
      },
            refreshSpeed*count
      );   
}

function getBraille(char, type) {
      if (type == 'CAPS') {
            var lower = String.fromCharCode(char.charCodeAt() + 32);
            return chars[lower];
      } else if (type == 'NUMB') {
            return chars[isNumber(char)];
      } else {
            return chars[char];
      }
}

function getType(char) {
      if (char >='A' && char <='Z') {
          return 'CAPS';
      } else if (char >='0' && char<='9') {
            return 'NUMB';
      } else {
            return 'CHAR';
      }
}

function isNumber(number) {
      var numbers = [
            'j', 
            'a', 
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i'
      ];
      return numbers[number];
}

function setBrailleLetter(binary, index, extra, move) {
      var refreshCount = Number(index) + Number(extra);
      //if ( function() { return stopAnimation; } ) { 
       setTimeout(function() {
            if( move ) {
                  moveFrame(index);
            } 
            for (var k in binary) {
                  if (binary[k] == '1') {
                        setPinOn(pins[k]);
                  } else {
                        setPinOff(pins[k]);
                  } 
            }
      }, refreshSpeed*refreshCount);        
      //}
}

function translate() {
      setFrame();
      var braille = [],
      type = [],
      extraCount = 0;

      for (var i in text) {
            type[i] = getType(text[i]);
            braille[i] = getBraille(text[i], type[i]);
      }
      for (var j in braille) {
            if (type[j] == 'CAPS') {
                  setBrailleLetter(caps, j, extraCount++, true);
                  setBrailleLetter(braille[j], j, extraCount, false);
            } else if (type[j] == 'NUMB') {
                  setBrailleLetter(number, j, extraCount++, true);
                  setBrailleLetter(braille[j], j, extraCount, false);
            } else {
                  setBrailleLetter(braille[j], j, extraCount, true);
            }
      }
      clearPinsAfterTranslation(braille.length + extraCount);
}

function setFrame() {
      $('#letters-container').append('<div id="frame"></div>'); 
      frame = $('#letters-container #frame');
      var pos = $('.letter').position();
      frame.css({'top':pos.top,'left':pos.left});
}

function resetFrame() {
      frame.hide();
      frame.css({'transform':'translateX(0px)'})
}

function moveFrame(i) {
      if (i == 0) {
            frame.show();
      }
      var value = (frame.outerWidth()) * i;
      frame.css({'transform':'translateX('+value+'px)'})
}

function start(start) {
      startButton = start;
      translate();
}

function reset() {
    text = [];
    lettersSet = false;
    setTimeout(function() {
        $('#letters-container').html(''); 
    }, 500);
}

function setup(input) {
      setLetters(input);
      getPins();
}