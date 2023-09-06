import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import i18n from "../../../utils/i18n";

import ScrollAnimation from "react-animate-on-scroll";

import config from "../../../config/config";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import Common from "../../../utils/Common";
import { GameService } from "../../../api-services/services/GameService";
import { AppHistory } from "../../../history/History";

const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  min-height: ${(props) =>
    props.GamePage_SpecificBackground ? "900px" : "870px"};
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      "/assets/images/pcGamePage/cockfight/background" +
      (props.GamePage_SpecificBackground ? "-hk28" : "") +
      ".jpg"})
    no-repeat;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GirlImage = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  width: 308px;
  height: 172px;
  background-size: contain;
  background-position: center;
  float: right;
  cursor: pointer;
`;
const LeftSlide = styled(ScrollAnimation)`
  display: grid;
  grid-template-columns: repeat(4, 308px);
  grid-gap: 10px;
  grid-auto-rows: 200px;
  justify-content: center;
  align-items: center;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: white;
  display: none;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 24px;
  user-select: none;
  cursor: not-allowed;
`;

const ImageWrapper = styled.div`
  position: relative;
  justify-self: center;

  ${({ maintenance }) => {
    return maintenance
      ? `

    ${Maintenance}{
     
      display: flex;
    }
    ${GirlImage}{
      filter: brightness(40%) grayscale(200%);
    }
    
    
    `
      : ``;
  }}
`;

class Cockfight extends Component {
  constructor(props) {
    super(props);

    var cockfightList = props.game.homePageGameList
      .filter((item) => {
        return item.type === GameTypeEnum.COCKFIGHT;
      })
      .sort((a, b) => {
        if (config.features.LiveGame_Sorting_SKY) {
          var sortDGFirst = ["DG"];
          return (
            sortDGFirst.indexOf(b.abbreviation) -
            sortDGFirst.indexOf(a.abbreviation)
          );
        } else return b - a;
      });

    this.state = {
      selected: cockfightList[0],
      subMenu: null,
      isSelected: false,
      hide: true,
      list: cockfightList,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hide: false,
      });
    }, 1000);
  }
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var cockfightList = this.props.game.homePageGameList
        .filter((item) => {
          return item.type === GameTypeEnum.COCKFIGHT;
        })
        .sort((a, b) => {
          return b - a;
        });

      this.setState({
        ...this.state,
        selected: cockfightList[0],
        list: cockfightList,
      });
    }
  }
  triggerSetSelected = (bool) => {
    this.setState({
      isSelected: bool,
    });
    setTimeout(() => {
      this.triggerSetSelected(false);
    }, 800);
  };
  popup = null;
  handleJoinGameClick = (params) => {
    if (this.props.account.token != null) {
      if (params === "SM01") {
        if (document.getElementById("audio") != null)
          document.getElementById("audio").volume = 0.0;
        this.props.performBalanceRefresh();
        Common.closePreviousPopup();

        this.popup = window.open("", "Cockfight");
        GameService.GetCockfight()
          .then((e) => {
            this.popup.document.write(e.data);
            this.popup.document.close();
            this.popup.focus();
          })
          .catch((e) => {
            this.popup.close();
          });
      } else {
        AppHistory.push("/sports/play/" + params + "/" + GameTypeEnum.SPORTS);
      }
    } else {
      this.props.showLogin(true);
    }
  };

  handleGameChange = (game) => {
    this.setState({
      selected: game,
    });
  };

  render() {
    const ImageDisplayer = ({ item }) => {
      return (
        <ImageWrapper maintenance={item.status != 0}>
          <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
          <GirlImage
            img={
              process.env.PUBLIC_URL +
              "/assets/images/pcGamePage/cockfight/" +
              item.abbreviation.toLowerCase() +
              (item.abbreviation.toLowerCase() === "wgfm" ||
              item.abbreviation.toLowerCase() === "wgvia"
                ? "-" + i18n.language
                : "") +
              ".png"
            }
            onClick={() => {
              this.handleJoinGameClick(item.abbreviation, item.type);
            }}
          />
        </ImageWrapper>
      );
    };

    var ifMoreThanTen = this.state.list.length >= 10;

    const firstRow = ifMoreThanTen ? 2 : 5;
    const secondRow = ifMoreThanTen ? 3 : 6;

    const customSorting = this.state.list.sort((a, b) => {
      if (config.features.LiveGame_Sorting_SKY) {
        var sortDGFirst = ["DG"];
        return (
          sortDGFirst.indexOf(b.abbreviation) -
          sortDGFirst.indexOf(a.abbreviation)
        );
      } else return b - a;
    });

    return (
      <Container
        GamePage_SpecificBackground={
          config.features.GamePage_SpecificBackground
        }
      >
        <ItemContainer>
          <LeftSlide
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {customSorting.map((item, index) => {
              return <ImageDisplayer item={item} />;
            })}
          </LeftSlide>
        </ItemContainer>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cockfight);
