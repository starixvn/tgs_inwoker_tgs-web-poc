import i18n from "@/utils/i18n";

var fontFamily = "Roboto, sans-serif";

if (i18n.language === "zh-CN") {
  fontFamily =
    "'Noto Sans SC', Microsoft Yahei, '微软雅黑', STXihei, '华文细黑'";
} else if (i18n.language === "zh-TW") {
  fontFamily =
    "'Noto Sans TC', Tahoma, Helvetica, Arial, sans-serif, '微軟正黑粗'";
} else if (i18n.language === "th-TH") {
  fontFamily = "'Sarabun', sans-serif";
}
document.getElementById("root").style.fontFamily = fontFamily;

export { fontFamily };
