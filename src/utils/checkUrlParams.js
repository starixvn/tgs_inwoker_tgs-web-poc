export const checkInHomePage = () => {
  return (
    window.location.pathname === "/" ||
    window.location.pathname === "/main/home"
  );
};
