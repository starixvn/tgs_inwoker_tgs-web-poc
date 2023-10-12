import React from "react";

type Props = {
  playerName;
};
const MaskPlayerName = ({ playerName }: Props) => {
  const firstTwoChars = playerName.slice(0, 2);
  const lastTwoChars = playerName.slice(-2);
  const maskedUsername = firstTwoChars + "****" + lastTwoChars;

  return <>{maskedUsername}</>;
};

export default MaskPlayerName;
