import React from "react";
import styled from "styled-components";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { themeList } from "@/theme";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import DownloadApp from "@/components/Mobile/components/Account/AccountNavigations/DownloadAppDialog/DownloadApp";

const theme = themeList["mobileT18"];

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

const DownloadAppDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <>
      <DialogWithHeader
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        dialogHeaderTitle={"Download App"}
      >
        <DownloadApp />
      </DialogWithHeader>
    </>
  );
};

export default React.memo(DownloadAppDialog);
