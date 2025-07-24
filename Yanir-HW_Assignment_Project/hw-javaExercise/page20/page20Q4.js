
let year =1452

if (year % 4 == 0 && (year % 100 !== 0 || year % 400 == 0) ) {
    console.log('שנה מעוברת');
    
}
else (
    console.log('שנה לא מעוברת')
)