const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://easylegal.biz.id');
  const sections = await page.$$eval('section, nav, footer, header', elements => {
    return elements.map(el => {
      return {
        tag: el.tagName,
        className: el.className,
        text: el.innerText.substring(0, 100).replace(/\n/g, ' '),
        id: el.id
      };
    });
  });
  console.log(JSON.stringify(sections, null, 2));
  await browser.close();
})();
