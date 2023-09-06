import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";
import { GameTypeEnum } from "../../../../../../api-services/utils/Enum";
import { walletAction } from "../../../../../../api-services/actions/walletAction";
const HomeContent = styled.div`
  flex: 1 1 0%;
  width: 100%;
  height: ${(props) => props.containerHeight}px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const HomeArticle = styled.div`
  height: 110px;
  padding: 5px 0;
`;
const MemberNav = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  padding: 0 20px;
`;
const NavLeftNoLogin = styled.div`
  padding-top: 0.1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: ${({ theme }) => theme.primary};
`;
const NavLeftLogin = styled.div`
  padding-top: 0.1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
`;
const LoginUsernameContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;
const LoginUsername = styled.div`
  font-size: 26px;
  font-weight: bold;
`;

const LoginVIP = styled.div`
  font-size: 24px;
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  padding: 0 10px;
  font-weight: bold;
  border-radius: 5px;
  margin-left: 10px;
  font-style: italic;
`;
const LoginBalance = styled.div`
  font-size: 30px;
  margin-top: 20px;
`;
const LoginBalanceRefresh = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.secondaryText};
  mask: url(${process.env.PUBLIC_URL +
    "/assets/images/wapp/home/T15/refresh.svg"})
    no-repeat left center;
  mask-size: 40px 40px;
  margin-left: 20px;
`;
const NavLeftNoLoginTextHeader = styled.span`
  font-weight: bold;
  font-size: 30px;
`;
const NavLeftNoLoginText = styled.span`
  font-size: 24px;
`;
const NavRight = styled.ul`
  width: 4.08rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.3rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const NavRightLI = styled.li`
  max-width: 80px;
  text-align: center;
`;
const NavRightLIText = styled.span`
  max-width: 80px;
  text-align: center;
  font-size: 22px;
  color: ${({ theme }) => theme.primary};
`;
const NavIcon = styled.div`
  width: 80px;
  height: 60px;
  margin: 0 auto;
  background: url(${process.env
      .PUBLIC_URL}/assets/images/wapp/home/T15/deposit.png)
    no-repeat;
  background-size: contain;
  background-position: center;
`;
const GameEnterWrap = styled.div`
  width: 100%;
  height: calc(100% - 120px);
  display: flex;
  padding-left: 0.18rem;
  transition: all 0.5s;
  overflow: hidden;
`;

const GameSelectionUL = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #cdcdcd;
  width: 160px;
  overflow-y: auto;
  float: left;
`;

const GameSelectionLI = styled.div`
  background: url(${process.env.PUBLIC_URL}/assets/images/wapp/home/T15/${({
      selected,
      theme,
    }) => (selected ? `gametype-selected.png` : `gametype.png`)})
    no-repeat center;
  background-size: contain;
  width: 100%;
  height: 66px;

  margin-bottom: 10px;

  color: ${({ selected, theme }) => {
    return selected ? "#9aa4c2" : "#fff";
  }};

  position: relative;
  &:after {
    content: "";
    background: url(${process.env.PUBLIC_URL}/assets/images/wapp/home/T15/${({
        gameType,
      }) => gameType}${({ selected }) => (selected ? `-selected` : ``)}.png)
      no-repeat left center;
    background-size: 100%;
    position: absolute;
    left: 20px;
    top: 0;
    width: 44px;
    height: 100%;
  }
`;
const GameTypeText = styled.div`
  margin-left: 66px;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  font-size: 20px;
`;
const GameContentWrap = styled.div`
  position: relative;
  flex: 1 1 0%;
  width: 100%;
  height: 100%;
  overflow: auto;
`;
const GameContentList = styled.ul`
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-duration: 0ms;
  transform: translate(0px, 0px) scale(1) translateZ(0px);
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
`;
const slideDown = keyframes`
  0% {
    -webkit-transform: translate3d(0,-10%,0);
    transform: translate3d(0,-10%,0);
    visibility: visible;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
`;
const slideUp = keyframes`
  0% {
    -webkit-transform: translate3d(0,10%,0);
    transform: translate3d(0,10%,0);
    visibility: visible;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
`;
const GameTabsContent = styled.li`
  overflow-y: auto;
  display: none;
  &.on {
    display: block;
    animation: ${({ index }) => (index == 0 ? slideDown : slideUp)} 0.2s ease;
  }
`;
const VendorGameWrap = styled.div`
  padding: 0px 20px 0px 0px;
  border-radius: 10px;
  width: 100%;
  float: right;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
`;
// margin-bottom: 120px;
const GameFrameImg = styled.div`
  width: 100%;
  height: 266px;
  display: block;
  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: 100%;
  border-radius: 20px;
`;

const Maintenance = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  font-size: 40px;
  font-weight: bold;
  text-transform: capitalize;
`;

const NewWrapper = styled.div`
  position: relative;
  height: 266px;
  border-radius: 20px;
  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameFrameImg}{
        filter: brightness(40%) grayscale(200%);
      }
      ${Maintenance}{
        display: flex;
    
    }`
      : ``;
  }}
`;

// to prevent scrolling issue
const EmptyWrapper = styled.div`
  height: 10px;
`;

const Template15 = ({
  gameTypeListSorting,
  homePageGameList,
  getImgPrefix,
  convertGameTypeToText,
  handleGameClick,
  scrollRef,
  getBannerTemplate,
  handleSignupClick,
  appHistory,
  account,
  wallet,
  getBalanceList,
}) => {
  //use ResizeObserver to detect the size of the window
  const [height, setHeight] = useState(undefined);
  const [isLogin, setIsLogin] = useState(false);
  const [balance, setBalance] = useState(0);
  const [selectedGameType, setSelectedGameType] = useState(1);
  const handleGameTypeClick = (gameType) => {
    setSelectedGameType(gameType);
  };
  useEffect(() => {
    if (account.token != null) {
      getBalanceList();
      setIsLogin(true);
    }
    setHeight(window.innerHeight - 460 - 90);
  }, []);

  const colorChanger = (color) => {
    switch (color) {
      case "white":
        return "white";
      default:
        return "gold";
    }
  };

  return (
    <HomeContent containerHeight={height}>
      <HomeArticle>
        <MemberNav>
          {(() => {
            if (isLogin === true) {
              return (
                <NavLeftLogin>
                  <LoginUsernameContainer>
                    <LoginUsername>
                      {account.info.member_username}
                    </LoginUsername>
                    {config.features.HaveVIPFeature ? (
                      <LoginVIP>VIP {account.info.member_level_id}</LoginVIP>
                    ) : (
                      ""
                    )}
                  </LoginUsernameContainer>
                  <LoginUsernameContainer>
                    <LoginBalance>{wallet.mainBalance}</LoginBalance>
                    <LoginBalanceRefresh
                      onClick={() => getBalanceList()}
                    ></LoginBalanceRefresh>
                  </LoginUsernameContainer>
                </NavLeftLogin>
              );
            } else {
              return (
                <NavLeftNoLogin onClick={handleSignupClick}>
                  <NavLeftNoLoginTextHeader>
                    {i18n.t("t15.notLogin")}
                  </NavLeftNoLoginTextHeader>
                  <NavLeftNoLoginText>
                    {i18n.t("t15.logintoCheck")}
                  </NavLeftNoLoginText>
                </NavLeftNoLogin>
              );
            }
          })()}

          <NavRight>
            <NavRightLI onClick={() => appHistory.push("/deposit")}>
              <NavIcon></NavIcon>
              <NavRightLIText>{i18n.t("common.deposit")}</NavRightLIText>
            </NavRightLI>
            <NavRightLI onClick={() => appHistory.push("/withdrawal")}>
              <NavIcon></NavIcon>
              <NavRightLIText>{i18n.t("common.withdrawal")}</NavRightLIText>
            </NavRightLI>
            {config.features.HaveVIPFeature && (
              <NavRightLI onClick={() => appHistory.push("/vip")}>
                <NavIcon></NavIcon>
                <NavRightLIText>VIP</NavRightLIText>
              </NavRightLI>
            )}
          </NavRight>
        </MemberNav>
      </HomeArticle>
      <GameEnterWrap>
        <GameSelectionUL ref={scrollRef}>
          {gameTypeListSorting.map((type, index) => {
            return (
              <GameSelectionLI
                style={
                  i18n.language === "en-US"
                    ? {
                        fontSize: 24,
                      }
                    : {}
                }
                gameType={type}
                key={index}
                selected={selectedGameType === type}
                onClick={() => handleGameTypeClick(type)}
              >
                <GameTypeText> {convertGameTypeToText(type)}</GameTypeText>
              </GameSelectionLI>
            );
          })}
        </GameSelectionUL>

        <GameContentWrap>
          <GameContentList>
            {(() => {
              if (selectedGameType <= 0) {
                return <React.Fragment></React.Fragment>;
              }

              return gameTypeListSorting.map((gameType, index) => {
                return (
                  <GameTabsContent
                    key={index}
                    index={index}
                    className={gameType == selectedGameType ? `on` : `off`}
                  >
                    <VendorGameWrap>
                      {(() => {
                        return homePageGameList
                          .filter(
                            (a) =>
                              (a.type === gameType &&
                                a.type !== GameTypeEnum.RNGSPORTS) ||
                              (gameType === GameTypeEnum.SPORTS &&
                                a.type === GameTypeEnum.RNGSPORTS &&
                                a.abbreviation === "PPTF")
                          )
                          .map((row, index) => {
                            var gameCode = row.abbreviation.toLowerCase();
                            var jsx = (
                              <NewWrapper maintenance={row.status !== 0}>
                                <Maintenance>
                                  {i18n.t("transfer.maintenance")}
                                </Maintenance>
                                <LazyLoadImage
                                  width={"100%"}
                                  alt={""}
                                  effect="blur"
                                  src={`${
                                    process.env.PUBLIC_URL
                                  }/assets/images/wapGame/${getBannerTemplate(
                                    "T15"
                                  )}/${colorChanger(
                                    config.features.WapBannerColor
                                  )}/${getImgPrefix(row.type)}-${gameCode}${
                                    (gameCode === "wgvia" ||
                                      gameCode === "wgfm") &&
                                    config.features.SportsHideLogo
                                      ? "-hkjp"
                                      : ""
                                  }.png`}
                                  onClick={() =>
                                    handleGameClick(
                                      row.type,
                                      row.gpcode,
                                      row.game_platform_id
                                    )
                                  }
                                />
                              </NewWrapper>
                            );

                            return jsx;
                          });
                      })()}
                    </VendorGameWrap>
                  </GameTabsContent>
                );
              });
            })()}
          </GameContentList>

          <EmptyWrapper></EmptyWrapper>
        </GameContentWrap>
      </GameEnterWrap>
    </HomeContent>
  );
};
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Template15));
