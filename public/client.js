// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

window.addEventListener('load', () => {
  // document.writeln('Hey there')
  let date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  date = y + '-' + (m < 10 ? '0' + m : m) + '-' + d
  console.log(date)
  document.querySelector('[type="date"]').value = date
})