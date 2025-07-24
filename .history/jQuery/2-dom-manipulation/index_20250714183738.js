function generateBlueGoldStyle() {
  $(".blue-gold").css({ color: "blue", "background-color": "gold" });
}

generateBlueGoldStyle();

function generateMesurements() {
  $("#section-1-container").css({ hight: "300px", width: "150px" , border : 'black solid 2px'});
}

generateMesurements ();

function hideButtons() {
  $(".section-1, .section-2, .setion-3").hide();
} 

hideButtons()

$('#display-1').click(function(){
    $('.section-1').show()
})
$('#display-2').click(function(){
    $('.section-2').show()
})
$('#display-3').click(function(){
    $('.section-3').show()
})

$('#toggle').click(function(){
$('#section-1-container').addClass('blue-gold')
generateBlueGoldStyle();
})