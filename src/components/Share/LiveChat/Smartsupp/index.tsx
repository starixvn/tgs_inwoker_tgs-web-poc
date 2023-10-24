import React from "react";
import { theme } from "@/theme";

type SmartsuppProps = {
  smartsuppkey: string;
  xPosition?: number;
  yPosition?: number;
};
const Smartsupp = ({ smartsuppkey, xPosition, yPosition }: SmartsuppProps) => {
  const offsetX = xPosition || 50;
  const offsetY = yPosition || 50;
  const script = document.createElement("script");
  script.innerHTML =
    `var _smartsupp = _smartsupp || {};
        _smartsupp.key = "` +
    smartsuppkey +
    `"; _smartsupp.color ="` +
    theme.primary +
    `";
    _smartsupp.offsetX="` +
    offsetX +
    `";
    _smartsupp.offsetY="` +
    offsetY +
    `";
        window.smartsupp ||
          (function (d) {
            var s,
              c,
              o = (smartsupp = function () {
                o._.push(arguments);
              });
            o._ = [];
            s = d.getElementsByTagName("script")[0];
            c = d.createElement("script");
            c.type = "text/javascript";
            c.charset = "utf-8";
            c.async = true;
            c.src = "https://www.smartsuppchat.com/loader.js?";
            s.parentNode.insertBefore(c, s);
          })(document)`;
  document.body.appendChild(script);
  return "";
};

export default Smartsupp;
