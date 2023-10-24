import featureList from "./features";
import { isMobileOnly } from "react-device-detect";

const config = {
  baseUrl:
    window?.env?.apiUrl ||
    (window?.env ? "/api/" : "https://dev-t1.rpgp.cc/api/"),
  client:
    window?.env?.client ||
    "I7nKiimrZQOqnJ6ryjUw74c0Hi64KC6Myunhob4cHh8VOUIuZh4p63czefxyyzbZ",
  currency: window?.env?.currency || "HKD",
  brand: window?.env?.brand || process.env.REACT_APP_BRAND || "PGG",
  brandName: window?.env?.brandName
    ? window?.env?.brandName
    : window?.env?.brand || "GPI",
  theme: window?.env?.theme || "red",
  sourceUrl: window?.env?.sourceUrl || "https://images.srvptt.com/",
  defaultLanguage: window?.env?.defaultLanguage
    ? window?.env?.defaultLanguage === ""
      ? "zh-CN"
      : window?.env?.defaultLanguage
    : "zh-CN",
  affiliateId: window?.env?.affiliateId || "",
  features: featureList["default"],
};

config.from = isMobileOnly ? "h5" : "h5";
config.isPC = isMobileOnly ? 1 : 0;

export default config;
