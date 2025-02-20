import puppeteer from "puppeteer";

export const extractAndScanElements = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const pageContent = await page.content();

  const scriptSources = await page.evaluate(() =>
    Array.from(document.scripts)
      .map((script) => script.src)
      .filter((src) => src)
  );

  await browser.close();
  return { pageContent, scriptSources };
};

export const checkThirdPartyResources = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let thirdPartyRequests: string[] = [];

  page.on("request", (request) => {
    const requestUrl = new URL(request.url());
    const mainDomain = new URL(url).hostname;

    if (requestUrl.hostname !== mainDomain) {
      thirdPartyRequests.push(requestUrl.hostname);
    }
  });

  await page.goto(url, { waitUntil: "networkidle2" });

  await browser.close();
  return thirdPartyRequests;
};
