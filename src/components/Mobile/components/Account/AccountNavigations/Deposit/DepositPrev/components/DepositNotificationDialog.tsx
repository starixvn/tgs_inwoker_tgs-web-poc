import React, { useCallback, useState } from "react";
import config from "@/config/config";
import PopupAnnouncement from "@/components/Share/PopupAnnouncement";
import { useUiStore } from "@/hooks/stores/useUiStore";

type Props = {};
const DepositNotificationDialog = (props: Props) => {
  const { ui } = useUiStore();
  const [isDialogOpen, setIsDialogOpen] = useState(
    config.features.DepositNotification
  );

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  if (
    !(
      config.features.DepositNotification &&
      ui.deposits &&
      ui.deposits.length > 0
    )
  ) {
    return null;
  }

  var row = ui.deposits[0];

  return (
    <PopupAnnouncement
      open={isDialogOpen}
      onClose={closeDialog}
      text={
        row.localization !== null && row.localization.content
          ? row.localization.content
          : row.content
      }
      header={
        row.localization !== null && row.localization.subject
          ? row.localization.subject
          : row.subject
      }
    />
  );
};

export default DepositNotificationDialog;
