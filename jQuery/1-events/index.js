$('#btn-1').click(function(){
    $('p').hide()
})

$('#btn-2').click(function(){
    $('p').show()
})

$('#btn-3').on("click", function(){
    $('p').toggle()
})

$('#btn-4').hover( function(){
    $('p').hide()
})

$('#btn-5').dblclick( function(){
    $('p').text('dubble click - clickedddd, niceeeeeeeeeee')
})

$("#text").focus(function () {
  $(this).val(125645876); //this do changes on the : $("#text"), we can put there every thing that we want to change
});

$('form').submit(onSubmit)

function onSubmit(){
const inputs = $('input')
for(const input of inputs){
    console.log($(input).val());
    
}
}