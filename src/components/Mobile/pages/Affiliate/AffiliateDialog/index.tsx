import React from "react";
import styled from "styled-components";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { themeList } from "@/theme";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Affiliate from "@/components/_Share_Domain/Account/Affiliate";

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
        dialogHeaderTitle={"Affiliate"}
      >
        <Affiliate />
      </DialogWithHeader>
    </>
  );
};

export default React.memo(AffiliateDialog);
