import Common from "./Common";

const getFormatAmount = (value: number) => {
  return Common.formatNumberWithCommas(value).replace(/\.?0+$/, "");
}

export default getFormatAmount;
