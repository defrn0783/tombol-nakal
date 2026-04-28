const REDIRECT_URLS = [
  "https://website-a.com",
  "https://website-b.com",
  "https://website-c.com",
];

const TIME_ZONE = "Asia/Jakarta";
const STATUS_CODE = 301;

function getHourInTimeZone(timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const hourPart = parts.find((part) => part.type === "hour");
  return Number(hourPart ? hourPart.value : "0");
}

function pickUrlByHour(hour) {
  const index = Math.floor(hour / 8);
  return REDIRECT_URLS[index] || REDIRECT_URLS[0];
}

export async function onRequest(context) {
  const hour = getHourInTimeZone(TIME_ZONE);
  const destination = pickUrlByHour(hour);

  return new Response(null, {
    status: STATUS_CODE,
    headers: {
      "Location": destination,
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
