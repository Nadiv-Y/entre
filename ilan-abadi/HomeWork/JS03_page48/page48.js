// programming-intro page 48

// 8.
// אני מניח שזו שגיאת כתיב והכוונה לפלינדרום
function isItPalindrome(arr10) {
    for(let i = 0; i <= 4; i++){
        if(i === 4){
            console.log ('This is a palindrome');
            break;
        }
        if(arr10[i] != arr10[9 - i]){
            console.log ('This is NOT a palindrome');
            break;
        }
    }
}
// let arr10 = [10, 9, 8, 7, 6, 6, 7, 8, 9, 10]
// let arr10 = [10, 8, 8, 5, 6, 6, 7, 8, 9, 10]
// let arr10 = ['הגנן','גידל','10','מלפפונים','בגן','בגן','מלפפונים', 10,'גידל','הגנן']
// isItPalindrome(arr10)