import React from "react";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useHistory } from "react-router-dom";
import MaintenancePrev from "@/components/Mobile/components/Maintenance";

const MaintenancePage = (props) => {
  const { general } = useGeneralStore();
  const history = useHistory();

  // useEffect(() => {
  //   if (!general.isMaintenance) {
  //     history.push("/" + i18n.language);
  //   }
  // });

  return <MaintenancePrev />;
};

export default MaintenancePage;
