import React from "react";
import CardPrev from "@/domain/Account/CardPrev";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useNavigate } from "@/hooks/pageProps/useNavigate";

type Props = {};
const Card = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const { navigate } = useNavigate();

  return <CardPrev appHistory={history} alert={alert} navigate={navigate} />;
};

export default Card;
