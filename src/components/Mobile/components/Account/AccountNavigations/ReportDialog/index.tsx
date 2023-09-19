import React from "react";
import styled from "styled-components";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { themeList } from "@/theme";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const theme = themeList["mobileT18"];

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

const ReportDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <>
      <DialogWithHeader
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        dialogHeaderTitle={"Report"}
      >
        <>YOYO</>
      </DialogWithHeader>
    </>
  );
};

export default React.memo(ReportDialog);
