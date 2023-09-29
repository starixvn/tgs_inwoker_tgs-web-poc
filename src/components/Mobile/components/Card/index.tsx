import React from "react";
import CardPrev from "@/components/_Share_Domain/CardPrev";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import { useNavigate } from "@/hooks/useNavigate";

type Props = {};
const Card = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const { navigate } = useNavigate();

  return <CardPrev appHistory={history} alert={alert} navigate={navigate} />;
};

export default Card;
