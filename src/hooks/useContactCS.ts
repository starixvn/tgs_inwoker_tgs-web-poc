import { useCallback } from "react";
import i18n from "@/utils/i18n";
import Common from "@/utils/Common";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useAuth } from "@/hooks/auth/useAuth";
import { useAccountStore } from "@/hooks/stores/useAccountStore";

interface ContactCSProps {
  userid: string;
  name: string;
  question: string;
  email: string;
}

export function useContactCS() {
  const { general } = useGeneralStore();
  const { isLogin } = useAuth();
  const { account } = useAccountStore();

  const GetSupportUrl = useCallback(
    ({ userid, name, email }: ContactCSProps) => {
      if (general.livechat) {
        const { setting } = general.livechat;
        const newURL = setting.url
          .replace("{name}", name)
          .replace("{lang}", i18n.language)
          .replace("{email}", email || "");
        if (newURL.length) {
          Common.PopupCenter(newURL, "", 785, 750);
        }
      }
    },
    [general.livechat]
  );

  const handleContactCs = useCallback(() => {
    if (!isLogin) {
      GetSupportUrl({ userid: "", name: "", question: "", email: "" });
    } else {
      GetSupportUrl({
        userid: "",
        name: account.info.member_username,
        question: "",
        email: account.info.member_email || "",
      });
    }
  }, [isLogin, GetSupportUrl, account.info]);

  return {
    handleContactCs,
  };
}
