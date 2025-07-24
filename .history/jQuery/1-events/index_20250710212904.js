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

$("#number").focus(function () {
  $(this).val(125645876);
});

$('form').submit(onSubmit)

function onSubmit(){
const inputs = $('input')
for(const input of inputs){
    console.log($(input).val());
    
}
}