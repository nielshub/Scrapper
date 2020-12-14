let date = new Date();
let seconds = date.getSeconds();
let seconds_target = 0;
console.log(date);
while (seconds !== seconds_target) {
  date = new Date();
  seconds = date.getSeconds();
  console.log(`Inside the loop ${seconds}`);
}
console.log(date);
//console.log(date.getDate());
//console.log(date.getDay());
