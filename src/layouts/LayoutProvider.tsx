import React from "react";
import { Route } from "@/router";

type Props = {
  route: Route;
};
const LayoutProvider = ({ route, children }: Props) => {
  const LayoutComponent = route.layout;

  if (!LayoutComponent) return <>{children}</>;

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default LayoutProvider;
