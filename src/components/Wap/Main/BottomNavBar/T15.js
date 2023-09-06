import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";

import i18n from "../../../../utils/i18n";
const bounceDown = keyframes`
  0% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  20% {
    -webkit-transform: scale3d(.6,.6,1);
    transform: scale3d(.6,.6,1);
  }
  40% {
    -webkit-transform: scale3d(1.2,1.2,1);
    transform: scale3d(1.2,1.2,1);
  }
  60% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  80% {
    -webkit-transform: scale3d(1.1,1.1,1);
    transform: scale3d(1.1,1.1,1);
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`;

const StyledBottomAppBar = withStyles({
  root: {
    height: "90px",
    top: "auto",
    bottom: 0,
    background: "none",
  },
})(AppBar);

const CustomStyledAppBar = styled(StyledBottomAppBar)`
  border-radius: ${({ theme }) => theme.bottomnavrad};
`;

const CustomCustomBottomNav = styled.ul`
  background: ${({ theme }) => theme.bottomnav};
  border-radius: ${({ theme }) => theme.bottomnavrad};
  display: flex;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
`;

const CustomCustomBottomNavAction = styled.li`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.bottomNavAction};
  & .Mui-selected {
    color: ${({ theme }) =>
      theme.bottomNavActionSelected
        ? theme.bottomNavActionSelected
        : theme.primary};
  }
  &.Mui-selected .MuiBottomNavigationAction-wrapper > div {
    background: ${({ theme }) =>
      theme.bottomNavActionSelected
        ? theme.bottomNavActionSelected
        : theme.primary};
  }
`;

const IconHolder = styled.div`
  width: 60px;
  height: 50px;
  background-color: ${({ theme }) => theme.bottomNavAction};
  background: ${({ icon, iconSelected, selected }) => {
    return `url(${selected ? iconSelected : icon}) no-repeat center /
  contain;`;
  }};
  &.on {
    display: block;
    animation: ${bounceDown} 0.5s ease-in-out;
  }
`;

const NavText = styled.div`
  color: ${({ selected, theme }) =>
    selected ? theme.primary : theme.secondaryText};
`;

class BottomNavBarT15 extends Component {
  bottomNavButtonWapT11 = [
    {
      icon: "home.png",
      text: i18n.t("wap.main.homePage"),
      to: "/",
      resetPage: true,
    },
    {
      icon: "promotion",
      text: i18n.t("wap.main.promo"),
      to: "/promotion-list",
      isGif: true,
    },
    {
      icon: "deposit",
      text: i18n.t("common.deposit"),
      to: "/deposit",
      isGif: true,
    },
    {
      icon: "withdrawal",
      text: i18n.t("common.withdrawal"),
      to: "/withdrawal",
      isGif: true,
    },
    {
      icon: "cs.svg",
      text: i18n.t("wap.main.cs"),
      to: "/main/support",
    },
    {
      icon: "me.png",
      text: i18n.t("wap.main.my"),
      to: "/main/profile",
    },
  ];

  state = {
    currentPage: this.props.history.location.pathname,
    showMenu: false,
  };
  // GetSupportUrl = (userid, name, question) => {
  //   var response = SupportService.GetLiveSupport(
  //     userid,
  //     name,
  //     question,
  //     document.URL,
  //     document.referrer
  //   )
  //   if (response.IsSuccess) {
  //     window.open(response.data.online, "_blank")

  //   } else {
  //     this.props.alert("", response.info);

  //   }
  // };

  handleChangeSelection = (value, resetPage) => {
    if (value === "/main/profile" && this.props.account.token == null) {
      this.props.appHistory.push("/login");
    } else {
      this.setState({
        ...this.state,
        currentPage: value,
      });
      this.props.appHistory.push({
        pathname: value,
        state: { resetPage: resetPage },
      });
      if (this.state.showMenu) {
        this.setState({
          ...this.state,
          showMenu: false,
        });
      }
    }
  };

  switchBottomNav = () => {
    return [
      {
        icon: "home",
        text: i18n.t("wap.main.homePage"),
        to: "/",
        resetPage: true,
      },
      {
        icon: "promotion",
        text: i18n.t("wap.main.promo"),
        to: "/promotion-list",
        isGif: false,
      },
      {
        icon: "wallet",
        text: i18n.t("common.deposit"),
        to: "/deposit",
        isGif: false,
      },
      {
        icon: "cs",
        text: i18n.t("common.withdrawal"),
        to: "/withdrawal",
        isGif: false,
      },
      {
        icon: "me",
        text: i18n.t("wap.main.my"),
        to: "/main/profile",
      },
    ];
  };

  render() {
    return (
      <CustomStyledAppBar position="fixed" color="default">
        <CustomCustomBottomNav
          value={this.state.currentPage}
          showLabels
          style={{ width: "750px", height: "90px" }}
        >
          {this.switchBottomNav().map((data, index) => {
            return (
              <CustomCustomBottomNavAction
                value={data.to}
                onClick={() =>
                  data.to
                    ? this.handleChangeSelection(data.to, data.resetPage)
                    : this.props.toggleMenu()
                }
              >
                <IconHolder
                  selected={this.state.currentPage === data.to}
                  className={this.state.currentPage === data.to ? `on` : `off`}
                  icon={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/bottomnav/T15/${data.icon}.png`
                  }
                  iconSelected={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/bottomnav/T15/${data.icon}-selected.png`
                  }
                />
                <NavText selected={this.state.currentPage === data.to}>
                  {data.text}
                </NavText>
              </CustomCustomBottomNavAction>
            );
          })}
        </CustomCustomBottomNav>
      </CustomStyledAppBar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
    wallet: state.wallet,
  };
};

export default connect(mapStateToProps, null)(withRouter(BottomNavBarT15));
