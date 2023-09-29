import React from "react";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useHistory } from "react-router-dom";
import Maintenance from "@/components/Mobile/components/Maintenance";

const MaintenancePage = (props) => {
  const { general } = useGeneralStore();
  const history = useHistory();

  // useEffect(() => {
  //   if (!general.isMaintenance) {
  //     history.push("/" + i18n.language);
  //   }
  // });

  return <Maintenance />;
};

export default MaintenancePage;
