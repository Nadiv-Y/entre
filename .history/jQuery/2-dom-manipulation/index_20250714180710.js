function generateBlueGoldStyle() {
  $(".blue-gold").css({ color: "blue", "background-color": "gold" });
}

generateBlueGoldStyle();

function hideButtons() {
  $(".section-1, .section-2, .setion-3").hide();
} 

hideButtons()

$('#display-1').click(function(){
    $('.section-1').show()
})
