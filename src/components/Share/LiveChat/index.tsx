import React from "react";
import Smartsupp from "./Smartsupp";
import LiveChatCS from "./LiveChat";
import Tawkto from "./Tawkto";
import Zendesk from "./Zendesk";
import config from "@/config/config";

type LiveChatProps = {
  vendor: string;
  license: string;
  group: string;
};

const LiveChat = ({ vendor, license, group }: LiveChatProps) => {
  if (
    !config.features.LiveChatVendor.brand ||
    !config.features.LiveChatVendor.license
  ) {
    return null;
  }

  const typeSwitcher = (vendor) => {
    switch (vendor) {
      case "smartsupp":
        return <Smartsupp smartsuppkey={license} />;
      case "livechat":
        return <LiveChatCS license={license} group={group} />;
      case "tawk":
        return <Tawkto license={license} />;
      case "zendesk":
        return <Zendesk license={license} />;
      default:
        return "";
    }
  };

  return typeSwitcher(vendor);
};

export default LiveChat;
