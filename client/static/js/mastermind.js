
// INITIAL CONDITIONS - GAME_BOARD, SOLUTION BUTTONS, AND INSTRUCTIONS ARE HIDDEN
$(document).ready(function(){
  $('.restart').hide();
  $('#game_board').hide();
  $('.solution').hide();
  $("#instructions").hide();
  $(".response").hide();
});

// INSTRUCTIONS TOGGLE BETWEEN HIDE AND REVEAL
$(document).on("click", "#controls p:nth-child(1)", function() {
      if ($("#instructions").is(":hidden")) {
        $("#instructions").show();
      }
      else {
        $("#instructions").hide();
      }
});

$(document).on("click", ".restart", function() {
    location.reload();
});

// THIS PART RANDOMLY GENERATES A SOLUTION KEY
var colors = [("rgb(42, 94, 214)"), ("rgb(183, 16, 16)"), ("rgb(10, 119, 16)"), ("rgb(85, 42, 150)"), ("rgb(242, 242, 19)")];

$(document).on('click', '.start', function() {
$('.start').hide();
$('.restart').show();  
$('#game_board').show();
console.log ('start');

var sol = [];
for (var d = 0; d < 4; d++){
  sol.push(colors[Math.trunc(Math.random()*5)]);
}
console.log(sol);


// THIS PART IS THE ORIGINAL DESIGN FOR COLOR SELECTION - CLICKING THROUGH COLORS IN ORDER

$(document).on("click", ".guess", function() {
      console.log('registered click');
      if ( $(this).css("background-color")=='rgb(216, 216, 216)') {
        $(this).css("background-color", "rgb(42, 94, 214)");
      }
      else if ( $(this).css("background-color")=='rgb(42, 94, 214)') {
        $(this).css("background-color", "rgb(183, 16, 16)");
      }
      else if ( $(this).css("background-color")=='rgb(183, 16, 16)') {
        $(this).css("background-color", "rgb(10, 119, 16)");
      }
      else if ( $(this).css("background-color")=='rgb(10, 119, 16)') {
        $(this).css("background-color", "rgb(85, 42, 150)");
      }
      else if ( $(this).css("background-color")=='rgb(85, 42, 150)') {
        $(this).css("background-color", "rgb(242, 242, 19)");
      }
      else if ( $(this).css("background-color")=='rgb(242, 242, 19)') {
        $(this).css("background-color", "rgb(216, 216, 216)");
      }
  });


// THIS IS THE CONTEXT MENU FOR SELECTING GUESS COLORS - A WORK IN PROGRESS, CURRENTLY DISABLED.
// var menu = [{
//         name: 'blue',
//         img: '#',
//         title: 'blue',
//         fun: function () {
//           $(this).css("background-color", "rgb(42, 94, 214)")
//         }
//     }, {
//         name: 'red',
//         img: '#',
//         title: 'red',
//         fun: function () {
//             $(this).css("background-color", "rgb(183, 16, 16)")
//         }
//     }, {
//         name: 'green',
//         img: '#',
//         title: 'green',
//         fun: function () {
//             $(this).css("background-color", "rgb(10, 119, 16)")
//         }
//     }];
//
// $(document).on('click', '.guess', function() {
//     contextmenu(menu);


// THIS BEGINS THE BULK OF THE CODE - ALL THE OPERATIONS THAT MUST BE CARRIED OUT FOLLOWING EVERY SUBMITTED GUESS
$(document).on("click", ".submit", function() {

// THIS GENERATES AN ARRAY CALLED "PLAY" POPULATED BY THE BG RGB VALUES OF THE GUESS BUTTONS IN THE GUESS ROW SUBMITTED
var play =
[($(this).parent().siblings('.guess1').css('background-color')),($(this).parent().siblings('.guess2').css('background-color')),($(this).parent().siblings('.guess3').css('background-color')),($(this).parent().siblings('.guess4').css('background-color'))];
console.log(play);

// THIS INTERCEPTS INCOMPLETE GUESSES - MUST BE COMPLETE TO GET A RESPONSE
for (var b = 0; b < play.length; b++) {
  if (play[b] == 'rgb(216, 216, 216)'){
    console.log ('incomplete guess');
    break;
  }
  else {
    $(this).fadeOut();
    $(this).parent().siblings().children(".response").show();
  }
}

// THESE VARIABLES ARE USED TO POPULATE RESPONSE KEYS ONCE VALUES ARE CALCULATED
var match = 0
var almost = 0

// BELOW IS A FAILED ATTEMPT TO COUNT MATCH AND ALMOST VALUES, STILL A WIP
// var play_almost = []
// var sol_almost = []

// for (var i = 0 ; i < play.length; i++) {
//   if ( play[i] == sol[i]) {
//     match++;
//   }
//   else {
//     for (var ab = 0; ab < 4; ab++) {
//       if (play[i] == play_almost[ab]) {
//         continue;  // this is supposed to prevent duplicates
//       }
//       else {
//         play_almost.push(play[i]);
//       }
//     }
//     for (var ac = 0; ac < 4; ac++) {
//       if (sol[i] == sol_almost[ac]) {
//         continue;
//       }
//       else {
//         sol_almost.push(sol[i]);
//       }
//     }
//   }
// }

// count 'almosts'
//var colors = [("rgb(42, 94, 214)"), ("rgb(183, 16, 16)"), ("rgb(10, 119, 16)"), ("rgb(85, 42, 150)"), ("rgb(242, 242, 19)")];

// console.log("play_almost: " + play_almost); //NOT POPULATING THESE ANYMORE
// console.log("sol_almost: " + sol_almost);

//TEMP ALTERNATE CODE - GIVES TOO MANY ALMOST RESPONSES, EARLIER VERSION GIVES TOO FEW
// for (var i = 0 ; i < play.length; i++) {
//   if ( play[i] == sol[i]) {
//     match++;
//   }
//   else {
//         play_almost.push(play[i]);
//         sol_almost.push(sol[i]);
//   }
// }

// console.log(`match: ${match}`);
// console.log(`almost: ${almost}`);
//
// console.log("play_almost: " + play_almost);
// console.log("sol_almost: " + sol_almost);

// for (var a = 0; a < (play_almost.length) ; a++) {
//   for (var ae = 0; ae < (sol_almost.length) ; ae++) {
//     console.log(play_almost[a], sol_almost[ae])
//     if (play_almost[a] == sol_almost[ae]) {
//       almost++;
//     }
//   }
// }
// console.log('match: ' + match, 'almost: ' + almost);

//BELOW IS A WORKING SECTION THAT ACCURATELY COUNTS MATCHES AND ALMOST MATCHES
var colorDict = {
  "rgb(42, 94, 214)": "blue",
  "rgb(183, 16, 16)": "red",
  "rgb(10, 119, 16)": "green",
  "rgb(85, 42, 150)": "purple",
  "rgb(242, 242, 19)": "yellow"
};


// THIS PIECE GENERATES TWO OBJECTS THAT CONTAIN A COUNT VALUE FOR EVERY COLOR IN THE PLAY AND SOLUTION ARRAYS
var playDict = {};
var solDict = {};

for (var i = 0 ; i < play.length; i++) {
  if ( play[i] == sol[i]) {
    match++;
  }
  if (!playDict[colorDict[play[i]]]) {
    playDict[colorDict[play[i]]] = 1;
  } else {
    playDict[colorDict[play[i]]]++;
  }
  if (!solDict[colorDict[sol[i]]]) {
    solDict[colorDict[sol[i]]] = 1;
  } else {
    solDict[colorDict[sol[i]]]++;
  }
}

// THIS PIECE EVALUATES THE COLOR KEYS IN EACH OBJECT
var playColors = Object.keys(playDict);
for (var i = 0; i < playColors.length; i++){
  if (solDict[playColors[i]]) {
    if (solDict[playColors[i]] == 1 || playDict[playColors[i]] == 1) {
      almost++;
    } else if (playDict[playColors[i]] > 1 && playDict[playColors[i]] <= solDict[playColors[i]]) {
      almost += playDict[playColors[i]];
    } else {
      almost += solDict[playColors[i]];
    }
  }
}

// THIS SETS THE VALUE OF ALMOST TO BE ALMOST LESS MATCH COUNT
almost -= match;

console.log('playDict', playDict);
console.log('solDict', solDict);

// SETS THE WIN CONDITION - ALERT, RESPONSE, AND REVEAL SOLUTION KEYS BY SHOWING AND POPULATING BACKGROUND-COLORS
if (match == 4) {
  console.log('win!');
  $('.submit').hide();
  alert('You Won!');
  $('.solution1').css('background-color', sol[0]);
  $('.solution2').css('background-color', sol[1]);
  $('.solution3').css('background-color', sol[2]);
  $('.solution4').css('background-color', sol[3]);
  $('.solution').fadeIn();
}

// THIS CREATES AND ARRAY OF BG VALUES WHICH ARE ALTERED AS WE ITERATE THROUGH THE MATCH AND ALMOST COUNTS
var reply = ['rgb (216, 216, 216)', 'rgb (216, 216, 216)', 'rgb (216, 216, 216)', 'rgb (216, 216, 216)'];
for (var e = 0; e < 4; e++) {
  if (match > 0) {
    reply[e] = 'rgb(0, 0, 0)';
    match--;
    continue;
  }
  else if (almost > 0) {
    reply[e] = 'rgb(255, 255, 255)';
    almost--;
  }
}
console.log(reply);



// THIS POPULATES THE COLORS OF THE RESPONSE KEY
if (match == 0 && almost < 3) {
  $(this).parent().siblings().children('.response1').css('background-color', reply[0]);
  $(this).parent().siblings().children('.response2').css('background-color', reply[1]);
  $(this).parent().siblings().children('.response3').css('background-color', reply[2]);
  $(this).parent().siblings().children('.response4').css('background-color', reply[3]);
}

// ON LAST GUESS, ALL SUBMIT BUTTONS HIDE AND SOLUTION IS REVEALED
$(document).on('click', '.last_guess', function() {
  console.log ('end');
  $('.submit').hide();
  $('.solution').fadeIn();
  $('.solution1').css('background-color', sol[0]);
  $('.solution2').css('background-color', sol[1]);
  $('.solution3').css('background-color', sol[2]);
  $('.solution4').css('background-color', sol[3]);
  

    });
  });
});
