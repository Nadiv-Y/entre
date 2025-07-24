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