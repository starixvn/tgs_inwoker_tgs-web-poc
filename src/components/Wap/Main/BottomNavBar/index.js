import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";

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
const CustomBottomNavigation = withStyles((theme) => ({
  root: {
    background: "none",
  },
}))(BottomNavigation);

const CustomCustomBottomNav = styled(CustomBottomNavigation)`
  background: ${({ theme }) => theme.bottomnav};
  border-radius: ${({ theme }) => theme.bottomnavrad};
`;
const CustomBottomNavigationAction = withStyles({
  root: {
    width: "570px",
    height: "90px",
    "&.Mui-selected": {
      "& .MuiBottomNavigationAction-wrapper>div": {
        backgroundColor: "#C69C6A",
      },
    },
  },
  label: {
    fontSize: config.brandName === "TIGER" ? "24px" : "21px",
    marginTop: "5px",

    "&.Mui-selected": {
      fontSize: "21px !important",
      marginTop: "5px",
      color: "#000",
    },
  },
})(BottomNavigationAction);

const CustomCustomBottomNavAction = styled(CustomBottomNavigationAction)`
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
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.bottomNavAction};
  mask: ${({ icon }) => {
    return `url(${icon}) no-repeat center /
  contain;`;
  }};
`;

const GifHolder = styled.div`
  width: 45px;
  height: 45px;
  background: ${({ icon }) => {
    return `url(${icon}) no-repeat center /
contain;`;
  }};
`;

class BottomNavBarDefault extends Component {
  bottomNavButton = [
    {
      icon: "home.svg",
      text: i18n.t("wap.main.homePage"),
      to: "/",
    },
    {
      icon: "promotion.svg",
      text: i18n.exists(`${config.brand}.promo`)
        ? i18n.t(`${config.brand}.promo`)
        : i18n.exists(`${config.brandName}.promo`)
        ? i18n.t(`${config.brandName}.promo`)
        : i18n.t("wap.main.promo"),
      to: "/promotion-list",
    },
    {
      icon: "withdrawal-piso.svg",
      text: i18n.t("wap.main.account.wallet"),
      to: "",
    },
    {
      icon: "cs.svg",
      text: i18n.exists(`${config.brand}.cs`)
        ? i18n.t(`${config.brand}.cs`)
        : i18n.exists(`${config.brandName}.cs`)
        ? i18n.t(`${config.brandName}.cs`)
        : i18n.t("wap.main.cs"),
      to: "/main/support",
    },
    {
      icon: "me.svg",
      text: i18n.exists(`${config.brand}.my`)
        ? i18n.t(`${config.brand}.my`)
        : i18n.exists(`${config.brandName}.my`)
        ? i18n.t(`${config.brandName}.my`)
        : i18n.t("wap.main.my"),
      to: "/main/profile",
    },
  ];

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

  switchBottomNav = (template) => {
    let bottomNav = [];
    switch (template) {
      case 11:
        bottomNav = this.bottomNavButtonWapT11;
        break;
      default:
        bottomNav = this.bottomNavButton;
        break;
    }
    return bottomNav;
  };

  render() {
    return (
      <React.Fragment>
        <CustomStyledAppBar position="fixed" color="default">
          <CustomCustomBottomNav
            value={this.state.currentPage}
            showLabels
            style={{ width: "750px", height: "90px" }}
          >
            {this.switchBottomNav(config.wapVersion).map((data, index) => {
              return (
                <CustomCustomBottomNavAction
                  label={data.text}
                  value={data.to}
                  onClick={() =>
                    data.to
                      ? this.handleChangeSelection(data.to, data.resetPage)
                      : this.props.toggleMenu()
                  }
                  icon={
                    data.isGif ? (
                      <GifHolder
                        icon={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/bottomnav/${data.icon}.gif`
                        }
                      />
                    ) : (
                      <IconHolder
                        icon={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/bottomnav/${data.icon}`
                        }
                      />
                    )
                  }
                />
              );
            })}
          </CustomCustomBottomNav>
        </CustomStyledAppBar>
      </React.Fragment>
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

export default connect(mapStateToProps, null)(withRouter(BottomNavBarDefault));
