function eighthQuestion(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[arr.length - 1 - i]) {
      return "Not Palindrome";
    }
  }
  return "Palindrome!";
}
