import React from "react";
import DepositPrev from "@/components/Mobile/components/Account/AccountNavigations/Deposit/DepositPrev";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";

type Props = {};
const Deposit = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  return <DepositPrev appHistory={history} alert={alert} />;
};

export default Deposit;
