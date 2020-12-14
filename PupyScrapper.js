const puppeteer = require("puppeteer");
const schedule = require("node-schedule");
let Niels_info = require("./Niels_info.json");

let late_training_day = [1, 2, 3];
let mid_training_day = [5];
let morning_training_day = [6];

async function Scrapper() {
  //Variables
  let date = new Date();
  date.setDate(date.getDate() + 7);
  //let reservation_day = date.getDate();
  let week_day = date.getDay();
  console.log(week_day);
  let time_class;
  if (late_training_day.includes(week_day)) {
    time_class = "20";
  } else if (mid_training_day.includes(week_day)) {
    time_class = "16";
  } else if (morning_training_day.includes(week_day)) {
    time_class = "10";
  } else {
    time_class = null;
  }
  //, slowMo: 5
  const browser = await puppeteer.launch({ headless: false, slowMo: 10 });
  const page = await browser.newPage();

  try {
    await page.goto("https://crosshero.com/athletes/sign_in", {
      waitUntil: "load",
    });

    //LOGIN
    await page.type("#athlete_email", "niels.sanchez@gmail.com");
    await page.type("#athlete_password", "niels123");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "load" }), // The promise resolves after navigation has finished
      page.click(".btn.btn-default.btn-danger"), // Clicking the link will indirectly cause a navigation
    ]);

    //CLASSES
    await Promise.all([
      page.waitForNavigation({ waitUntil: "load" }),
      await page.click(".fa.fa-edit"),
    ]);

    //ADVANCE
    await page.waitForSelector(
      ".row:nth-child(1) > .simple_form > .col-md-6 > .form-group > .select2 > .selection > .select2-selection > .select2-selection__arrow"
    );
    await page.click(
      ".row:nth-child(1) > .simple_form > .col-md-6 > .form-group > .select2 > .selection > .select2-selection > .select2-selection__arrow"
    );
    await page.type(".select2-search__field", "ADVANCE");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(50);

    //Wait till second 0
    await ItsTIME();

    //DATE
    await page.waitForSelector(".simple_form #class_date");
    await page.click(".simple_form #class_date");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(50);

    //CLASE
    await page.waitForSelector(
      "#new_class_reservation > .col-md-6 > .form-group > .select2 > .selection > .select2-selection > .select2-selection__arrow"
    );
    await page.click(
      "#new_class_reservation > .col-md-6 > .form-group > .select2 > .selection > .select2-selection > .select2-selection__arrow"
    );
    await page.type(".select2-search__field", `${time_class}`);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(50);

    //GUARDAR CLASE
    await page.waitForSelector("#classes-sign-in");
    await page.click("#classes-sign-in");
    console.log("Apuntado");
  } catch (error) {
    console.log(error);
  }
  await browser.close();
}

async function ItsTIME() {
  let date = new Date();
  let seconds = date.getSeconds();
  let seconds_target = 0;
  console.log(date);
  while (seconds !== seconds_target) {
    date = new Date();
    seconds = date.getSeconds();
    console.log(`Inside the loop ${seconds}`);
  }
  return;
}

let rule_late_training = new schedule.RecurrenceRule();
let rule_mid_training = new schedule.RecurrenceRule();
let rule_morning_training = new schedule.RecurrenceRule();
rule_late_training.dayOfWeek = [1, 2, 3];
rule_late_training.hour = 19;
rule_late_training.minute = 59;

rule_mid_training.dayOfWeek = [5];
rule_mid_training.hour = 15;
rule_mid_training.minute = 59;

rule_morning_training.dayOfWeek = [6];
rule_morning_training.hour = 10;
rule_morning_training.minute = 29;

let x = schedule.scheduleJob(rule_late_training, function () {
  console.log("Lanzando task para apuntarse a Crossfit ADVANCE a las 20:00");
  Scrapper();
  console.log(x.nextInvocation());
});

let y = schedule.scheduleJob(rule_mid_training, function () {
  console.log("Lanzando task para apuntarse a Crossfit ADVANCE a las 16:00");
  Scrapper();
});

let z = schedule.scheduleJob(rule_morning_training, function () {
  console.log("Lanzando task para apuntarse a Crossfit ADVANCE a las 10:30");
  Scrapper();
});
