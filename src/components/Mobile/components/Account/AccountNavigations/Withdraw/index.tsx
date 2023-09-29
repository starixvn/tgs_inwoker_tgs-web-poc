import React from "react";
import WithdrawalPrev from "@/components/_Share_Domain/Account/WithdrawalPrev";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";

type Props = {};
const Withdraw = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();

  return <WithdrawalPrev appHistory={history} alert={alert} />;
};

export default Withdraw;
