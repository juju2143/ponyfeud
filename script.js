var strikes = 0;
var multiplier = 1;

function clear()
{
  strikes = 0;
  $("body").removeClass().addClass("x0");
  $("#answers").html("");
  $("#current").val(0);
}

function newGame()
{
  clear();
  $(".score").val(0);
}

function load(survey)
{
  clear();
  for(var i = 0; i<surveys[survey].length; i++)
  {
    var $collection = $("<div>").addClass("answer").click(clickAnswer)
                  .append($("<div>").addClass("word").html(surveys[survey][i][0]))
                  .append($("<div>").addClass("points").html(surveys[survey][i][1]));
    $("#answers").append($collection);
  }
}

function clickAnswer(n)
{
  if(typeof n === 'number') $this = $(".answer:nth-of-type("+n+")");
  else $this = $(this);
  $this.toggleClass("shown");
  var $current = $("#current");
  var points = parseInt($this.children(".points").text())*multiplier;
  if($this.hasClass("shown"))
  {
    $current.val(parseInt($current.val()) + points);
    $("#correct").trigger("play");
  }
  else
  {
    $current.val(parseInt($current.val()) - points);
  }
}

function strike()
{
  $("#incorrect").trigger("play");
  strikes = strikes>=3?0:strikes+1;
  $("body").removeClass().addClass("x"+strikes);
}

function setMultiplier(mul)
{
  multiplier = mul;
  var $bonus = $("#bonus");
  $bonus.css("display","flex");
  switch(mul)
  {
    case 1:
      $bonus.css("display","none");
      break;
    case 2:
      $bonus.html("Double Points");
      break;
    case 3:
      $bonus.html("Triple Points");
      break;
    default:
      $bonus.html(mul+"x Points");
  }
}

function addToScore(counter)
{
  var $score = $(counter);
  $score.val(parseInt($score.val()) + parseInt($("#current").val()));
}

function changeTheme(css)
{
  $("#theme").prop("href",css);
}

$(document).ready(function(){
  newGame();

  var keys = Object.keys(surveys);
  for(var i = 0; i<keys.length; i++)
  {
    var $survey = $("<li>").append($("<a href='javascript:load(\""+keys[i]+"\")'>").html(keys[i]));
    $("#surveys").append($survey);
  }

  for(i = 0; i<colorSchemes.length; i++)
  {
    var $scheme = $("<li>").append($("<a href='javascript:changeTheme(\""+colorSchemes[i][1]+"\")'>").html(colorSchemes[i][0]));
    $("#colorschemes").append($scheme);
  }

  $("#multiplier").change(function(){
    setMultiplier(parseInt($(this).val()));
  });
  $(document).keypress(function(e){
    switch(e.which)
    {
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
        clickAnswer(e.which-48);
        break;
      case 99:
        addToScore("#left");
        break;
      case 118:
        addToScore("#right");
        break;
      case 120:
        strike();
        break;
      case 122:
        $("#multiplier").val(multiplier>=3?1:multiplier+1);
        $("#multiplier").change();
        break;
    }
  });
});