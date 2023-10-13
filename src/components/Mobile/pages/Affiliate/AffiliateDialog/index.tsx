import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { themeList } from "@/theme";
import Affiliate from "@/components/_Share_Domain/Account/Affiliate";
import i18n from "@/utils/i18n";

const theme = themeList["mobileT18"];

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

const AffiliateDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <>
      <DialogWithHeader
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        dialogHeaderTitle={i18n.t("affiliate.title")}
      >
        <Affiliate />
      </DialogWithHeader>
    </>
  );
};

export default React.memo(AffiliateDialog);
