import React, { ReactElement } from "react";

type Props = {
  children: ReactElement;
};
const MobileLayout = ({ children }: Props) => {
  return (
    <div>
      <h1>I am Header</h1>
      {children}
      <div>I am Footer</div>
    </div>
  );
};

export default MobileLayout;
