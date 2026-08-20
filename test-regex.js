const { pathToRegexp } = require("path-to-regexp");
try {
  const keys = [];
  const regex = pathToRegexp("/:path(.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico|avif))", keys);
  console.log("Regex works:", regex);
  console.log("Keys:", keys);
  console.log("Match Logo EL.png:", regex.exec("/Logo EL.png"));
  console.log("Match promo/hot-deal.jpg:", regex.exec("/promo/hot-deal.jpg"));
} catch (e) {
  console.error("Error:", e);
}
