import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import AddCardPrev from "@/domain/Account/CardPrev/AddCardPrev";

type Props = {};
const AddCard = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  return <AddCardPrev appHistory={history} alert={alert} />;
};

export default AddCard;
