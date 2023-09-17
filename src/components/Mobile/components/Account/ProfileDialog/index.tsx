import React, { useCallback, useState } from "react";
import styled from "styled-components";
import HeaderDialog from "@/components/Mobile/components/UI/Dialog/HeaderDialog";

type Props = {
  isOpen: boolean;
  toggleDialog: () => void;
};
const ProfileDialog = ({ isOpen, toggleDialog }: Props) => {
  return (
    <HeaderDialog
      isOpen={isOpen}
      toggleDialog={toggleDialog}
      dialogHeaderTitle={"Account"}
    >
      YOYO
    </HeaderDialog>
  );
};

export default React.memo(ProfileDialog);
