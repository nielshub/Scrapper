const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('https://crosshero.com/dashboard/classes?date=05%2F12%2F2020&program_id=5f74311754fc35003cdd6307')
  
  await page.setViewport({ width: 1130, height: 969 })
  
  await page.waitForSelector('.main-sidebar > .sidebar > .sidebar-menu > .active > a')
  await page.click('.main-sidebar > .sidebar > .sidebar-menu > .active > a')
  
  await navigationPromise
  
  await page.waitForSelector('.row:nth-child(1) > .simple_form > .col-md-6 > .form-group > .select2 > .selection > .select2-selection > .select2-selection__arrow')
  await page.click('.row:nth-child(1) > .simple_form > .col-md-6 > .form-group > .select2 > .selection > .select2-selection > .select2-selection__arrow')
  
  await navigationPromise
  
  await page.waitForSelector('.simple_form #class_date')
  await page.click('.simple_form #class_date')
  
  await page.waitForSelector('.datepicker-days > .table-condensed > tbody > tr:nth-child(2) > .day:nth-child(1)')
  await page.click('.datepicker-days > .table-condensed > tbody > tr:nth-child(2) > .day:nth-child(1)')
  
  await navigationPromise
  
  await page.waitForSelector('#new_class_reservation > .col-md-6 > .form-group > .select2 > .selection > .select2-selection > .select2-selection__arrow')
  await page.click('#new_class_reservation > .col-md-6 > .form-group > .select2 > .selection > .select2-selection > .select2-selection__arrow')
  
  await navigationPromise
  
  await page.waitForSelector('.row #classes-sign-in')
  await page.click('.row #classes-sign-in')
  
  await navigationPromise
  
  await browser.close()
})()