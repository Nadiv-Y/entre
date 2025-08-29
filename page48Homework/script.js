function isPalindrome(arr) {
  for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
    if (arr[i] !== arr[j]) return false;
  }
  return true;
}

const arr = [1, 2, 3, 4, 5, 5, 4, 3, 2, 1];
const ok = isPalindrome(arr);
console.log(ok ? "Palindrome" : "Not palindrome");