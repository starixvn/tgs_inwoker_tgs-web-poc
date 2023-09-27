import React from "react";
import DepositPrev from "@/components/Mobile/components/Account/AccountNavigations/Deposit/DepositPrev";
import { useHistory } from "react-router-dom";

type Props = {};
const Deposit = (props: Props) => {
  const history = useHistory();
  return <DepositPrev appHistory={history} />;
};

export default Deposit;
