import { GameTypeEnum, SlotGameParentId } from "@/api-services/utils/Enum";
import PromoImage1 from "@/assets/t18/images/promotion/promo-1.jpg";
import PromoImage2 from "@/assets/t18/images/promotion/promo-2.jpg";
import PromoImage3 from "@/assets/t18/images/promotion/promo-3.jpg";
import Provider1PNG from "@/assets/t18/images/provider1.png";
import Provider10PNG from "@/assets/t18/images/provider10.png";
import Provider2PNG from "@/assets/t18/images/provider2.png";
import Provider3PNG from "@/assets/t18/images/provider3.png";
import Provider4PNG from "@/assets/t18/images/provider4.png";
import Provider5PNG from "@/assets/t18/images/provider5.png";
import Provider6PNG from "@/assets/t18/images/provider6.png";
import Provider7PNG from "@/assets/t18/images/provider7.png";
import Provider8PNG from "@/assets/t18/images/provider8.png";
import Provider9PNG from "@/assets/t18/images/provider9.png";
import ABCPNG from "@/assets/t18/images/wap/bank/abc.png";
import BCMPNG from "@/assets/t18/images/wap/bank/bcm.png";
import BOBPNG from "@/assets/t18/images/wap/bank/bob.png";
import BOCPNG from "@/assets/t18/images/wap/bank/boc.png";
import BOSPNG from "@/assets/t18/images/wap/bank/bos.png";
import CCBPNG from "@/assets/t18/images/wap/bank/ccb.png";
import CEBPNG from "@/assets/t18/images/wap/bank/ceb.png";
import CGDPNG from "@/assets/t18/images/wap/bank/cgd.png";
import CIBPNG from "@/assets/t18/images/wap/bank/cib.png";
import CMBPNG from "@/assets/t18/images/wap/bank/cmb.png";
import CMBCPNG from "@/assets/t18/images/wap/bank/cmbc.png";
import DefaultPNG from "@/assets/t18/images/wap/bank/default.png";
import ECITICPNG from "@/assets/t18/images/wap/bank/ecitic.png";
import GFPNG from "@/assets/t18/images/wap/bank/gf.png";
import HXBPNG from "@/assets/t18/images/wap/bank/hxb.png";
import ICBCPNG from "@/assets/t18/images/wap/bank/icbc.png";
import PABPNG from "@/assets/t18/images/wap/bank/pab.png";
import PSBCPNG from "@/assets/t18/images/wap/bank/psbc.png";
import SPDBPNG from "@/assets/t18/images/wap/bank/spdb.png";
import i18n from "@/utils/i18n";

let newWindow: Window | undefined;

function getCDNLanguagePrefix(): string {
  let prefix = "en-US";
  const arr = [
    { lang: ["zh-CN", "zh-TW"], prefix: "zh-CN" },
    { lang: ["en-US"], prefix: "en-US" },
  ];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].lang.indexOf(i18n.language) >= 0) {
      prefix = arr[i].prefix;
      break;
    }
  }

  return prefix;
}

function getLanguagePrefixFolder(): string {
  let prefix = "en-US";
  const arr = [
    { lang: ["zh-CN"], prefix: "zh-CN" },
    { lang: ["zh-TW"], prefix: "zh-TW" },
    { lang: ["en-US"], prefix: "en-US" },
  ];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].lang.indexOf(i18n.language) >= 0) {
      prefix = arr[i].prefix;
      break;
    }
  }

  return prefix;
}

function readFileDataAsBinary(e: { files: FileList }): Promise<ArrayBuffer> {
  const file = e.files[0];

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target?.result as ArrayBuffer);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsArrayBuffer(file);
  });
}

function ConvertSlotGameParentIdToString(id: number): string | undefined {
  for (let key in SlotGameParentId) {
    if (SlotGameParentId[key] === id) {
      return key;
    }
  }
}

function GetBankImageByTitle(title: string): string {
  let bank = null;

  for (let k in bankImageMapping) {
    if (bankImageMapping[k.toLowerCase()].title === title) {
      bank = bankImageMapping[k.toLowerCase()];
      break;
    }
  }
  if (bank !== null) {
    return bank.image;
  } else {
    return DefaultPNG;
  }
}

function GetBankImageByCode(code: string): any {
  let mapp = bankImageMapping[code.toLowerCase()];
  if (mapp) {
    return mapp;
  } else {
    return {
      id: 0,
      title: code,
      image: DefaultPNG,
    };
  }
}

/**
 * @deprecated don't use this function
 * use utils/getDisplayGameType.ts instead
 */
function GetDisplayGameType(): GameTypeEnum[] {
  return [
    GameTypeEnum.SPORTS,
    // GameTypeEnum.RNGSPORTS,
    GameTypeEnum.ESPORTS,
    GameTypeEnum.LIVELOBBY,
    GameTypeEnum.QIPAILOBBY,
    GameTypeEnum.FISH,
    GameTypeEnum.LOTTERYLOBBY,
    GameTypeEnum.SLOT,
    GameTypeEnum.TABLEGAME,
    GameTypeEnum.COCKFIGHT,
  ];
}

GetDisplayGameType();

const gameImageMapping = [
  { gcode: "AG", img: Provider1PNG },
  { gcode: "BG", img: Provider2PNG },
  { gcode: "SG", img: Provider3PNG },
  { gcode: "VR", img: Provider4PNG },
  { gcode: "KY", img: Provider5PNG },
  { gcode: "JDB", img: Provider6PNG },
  { gcode: "HABA", img: Provider7PNG },
  { gcode: "PP", img: Provider8PNG },
  { gcode: "SABA", img: Provider9PNG },
  { gcode: "SBO", img: Provider10PNG },
];

const bankImageMapping: { [key: string]: any } = {
  ab: {
    id: 0,
    title: "农业银行",
    image: ABCPNG,
  },
  abc: {
    id: 0,
    title: "农业银行",
    image: ABCPNG,
  },
  bcm: {
    id: 0,
    title: "北京银行",
    image: BCMPNG,
  },
  bob: {
    id: 0,
    title: "北京银行",
    image: BOBPNG,
  },
  boc: {
    id: 0,
    title: "中国银行",
    image: BOCPNG,
  },
  bos: {
    id: 0,
    title: "上海银行",
    image: BOSPNG,
  },
  ccb: {
    id: 0,
    title: "建设银行",
    image: CCBPNG,
  },
  ecitic: {
    id: 0,
    title: "中信银行",
    image: ECITICPNG,
  },
  citic: {
    id: 0,
    title: "中信银行",
    image: ECITICPNG,
  },
  ceb: {
    id: 0,
    title: "中国光大银行",
    image: CEBPNG,
  },

  cgd: {
    id: 0,
    title: "广发银行",
    image: CGDPNG,
  },
  cib: {
    id: 0,
    title: "兴业银行",
    image: CIBPNG,
  },
  cmb: {
    id: 0,
    title: "招商银行",
    image: CMBPNG,
  },
  cmbc: {
    id: 0,
    title: "民生银行",
    image: CMBCPNG,
  },
  hxb: {
    id: 0,
    title: "华夏银行",
    image: HXBPNG,
  },
  hxbank: {
    id: 0,
    title: "华夏银行",
    image: HXBPNG,
  },
  icbc: {
    id: 0,
    title: "工商银行",
    image: ICBCPNG,
  },
  pab: {
    id: 0,
    title: "平安银行",
    image: PABPNG,
  },
  psbc: {
    id: 0,
    title: "中国邮政储蓄银行",
    image: PSBCPNG,
  },
  spdb: {
    id: 0,
    title: "浦东发展银行",
    image: SPDBPNG,
  },
  gf: {
    id: 0,
    title: "广发银行",
    image: GFPNG,
  },
  gdb: {
    id: 0,
    title: "广发银行",
    image: GFPNG,
  },
  pingan: {
    id: 0,
    title: "平安银行",
    image: GFPNG,
  },
  spabank: {
    id: 0,
    title: "平安银行",
    image: GFPNG,
  },
};

const popup: { [key: string]: Window } = {};

function PopupCenter(
  url: string,
  title: string,
  w = 0,
  h = 0
): Window | undefined {
  if (popup[title]) {
    if (!popup[title].closed) {
      popup[title].focus();
      return;
    }
  }

  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;

  const systemZoom = 1;
  let left = (width - w) / 2 / systemZoom + dualScreenLeft;
  let top = (height - h) / 2 / systemZoom + dualScreenTop;
  top = top < 0 ? 0 : top;
  left = left < 0 ? 0 : left;
  // closePreviousPopup();
  newWindow = window.open(
    url,
    "gamewindow",
    "scrollbars=yes, width=" +
    w / systemZoom +
    ", height=" +
    h / systemZoom +
    ", top=" +
    top +
    ", left=" +
    left
  );

  if (
    !newWindow ||
    newWindow.closed ||
    typeof newWindow.closed == "undefined"
  ) {
    // POPUP BLOCKED
  } else {
    // Puts focus on the newWindow
    if (window.focus) newWindow.focus();
  }
  popup[title] = newWindow;
  return newWindow;
}

function closePreviousPopup() {
  if (newWindow !== undefined) newWindow.close();
}

function GetBonusCategory(type_id: number): string {
  switch (type_id) {
    case 1:
      return "身份验证";

    case 2:
      return "邮件验证";

    case 3:
      return "手机验证";
    case 4:
      return "注册红利";
    case 5:
      return "VIP红利";
    case 8:
      return "签到红利";
    case 10:
      return "流水红利";
    case 11:
      return "单次存款红利";

    case 12:
      return "累计存款红利";

    case 21:
      return "累计流水";

    case 31:
      return "特殊红利";

    default:
      return "";
  }
}

function formatNumberWithCommas(x: number | string): string {
  if (typeof x === "number") return x.toString();

  return parseFloat(x)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function formatNumberWithThousand(x: number): string {
  if (isNaN(x)) return x.toString();
  return x.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function formatNumberWithCommasNoRounding(x: number | string): string {
  if (typeof x === "number") return x.toString();

  return parseFloat(x)
    .toFixed(6)
    .slice(0, -4)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const promoImgMap = [PromoImage1, PromoImage2, PromoImage3];

function GetPromoImg(index: number): string {
  return promoImgMap[index % 3];
}

const baseRouteUrl = `/:locale(en-US|zh-CN|zh-TW|th-TH|id-ID|vi-VN)`;

function addComma(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function arrayValidator(array: any[]): boolean {
  return array && Array.isArray(array) && array.length > 0;
}

function truncateString(str: string, n: number): string {
  return str.length > n ? str.slice(0, n) + "…" : str;
}

const Common = {
  baseRouteUrl,
  ConvertSlotGameParentIdToString,
  GetBonusCategory,
  formatNumberWithCommas,
  formatNumberWithThousand,
  formatNumberWithCommasNoRounding,
  PopupCenter,
  closePreviousPopup,
  bankImageMapping,
  GetBankImageByTitle,
  GetBankImageByCode,
  readFileDataAsBinary,
  GetDisplayGameType,
  gameImageMapping,
  GetPromoImg,
  getLanguagePrefixFolder,
  getCDNLanguagePrefix,
  addComma,
  arrayValidator,
  truncateString,
};

export default Common;
