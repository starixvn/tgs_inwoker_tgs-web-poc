import React, { ReactElement } from "react";
import Header from "@/components/Mobile/components/Header";
import BottomAppBar from "@/components/Mobile/components/BottomAppBar";

type Props = {
  children: ReactElement;
};
const MobileLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <BottomAppBar />
    </div>
  );
};

export default MobileLayout;
