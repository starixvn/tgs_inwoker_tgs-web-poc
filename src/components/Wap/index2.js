import React from 'react'


const css = `

      body{
        background:linear-gradient(180deg,rgb(5 30 74) 40%,rgba(12,21,37,1) 100%)
      }
      .header{
       font-family: Tahoma, Helvetica, Arial, sans-serif;
        top: 0;
        left: 0;
        right: 0;
        position: fixed;
        width: 750px;
        display: flex;
        z-index: 1100;
        box-sizing: border-box;
        flex-shrink: 0;
        flex-direction: column;
      }
      .header-inner{
        height: 125px;
        background: #161519;
        color: white;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        padding: 0px 0px 0px 0px;
      }
      .header-inner > div{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }
      .logo{
        background: url(assets/images/logo/IDR_LOGO.png) no-repeat left center;
        background-size: contain;
        width: 200px;
        height: 100px;
        margin-left: 30px;
      }
      .right-container{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
      .right-container > div{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding-right: 20px;
      }
      .vip-icon{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background: #ff9900;
        border: solid 1px #ff9900;
        color: #ffffff;
        padding: 10px 40px;
        font-size: 28px;
        margin: 0px 10px;
        border-radius: 15px;
      }
      .btn-login{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background: transparent;
        border: solid 1px #fff;
        color: #fff;
        padding: 10px 40px;
        font-size: 28px;
        margin: 0px 10px;
        border-radius: 15px;
      }
      .btn-register{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background: #ff9900;
        border: solid 1px #ff9900;
        color: #ffffff;
        padding: 10px 40px;
        font-size: 28px;
        margin: 0px 10px;
        border-radius: 15px;
      }
      .banner{
        height: 520px;
        padding-top: 125px;
      }
      .announcement{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        bottom: 0;
      }
      .announcement-inner{
        display: grid;
        padding: 0 20px;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        grid-template-columns: 125px auto auto auto;
        padding-bottom: 10px;
      }
      .online-user{
        color: #ffffff;

        text-align: unset;
        min-width: 125px;
        padding: 0 10px 0 0;
      }
      .online-user-number{
        color: #ffffff;
        font-weight: bold;
        text-align: unset;
      }
      .announcement-container{
        font-size: 28px;
        color: #ffffff;
        font-weight: bold;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex: none;
        -ms-flex: none;
        flex: none;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
      .announcement-logo{
        width: 80px;
        height: 80px;
        -webkit-mask: url(/assets/images/wapp/announce.svg) no-repeat center / contain;
        mask: url(/assets/images/wapp/announce.svg) no-repeat center / contain;
        background: #ff9900;
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .announcement-label{
        font-size: 28px;
        color: #ffffff;
        font-weight: bold;
      }
      .banner-slider{
        padding: 0;
        height:310px;
        overflow: hidden;
      }
    
`
const html = `
<div class="header" id="header">
<div class="header-inner">
  <div>
      <div class="logo"></div>
      <div class="right-container">
          <div>
              <div class="vip-icon" onclick="window.location.href = window.location.pathname + '/vip'">
                <img src="/assets/images/wapp/home-vip.png" alt="" style="height: 20px; margin-right: 10px;" />
                VIP</div>
              <div class="btn-login">Login</div> 
              <div class="btn-register">Register</div> 
          </div>
      </div>
  </div>
</div>
</div>
<div class="banner" id="banner">
  <div class="announcement">
      <div class="announcement-inner">
          <div class="online-user">Online users
            <span class="online-user-number">27336</span>
          </div>
          <div class="announcement-container">
            <div class="announcement-logo">

            </div>
            <div class="announcement-label"></div>
          </div>
      </div>

  </div>
  <div class="banner-slider">
    <div class="slider" >
      <div ><img src="https://project.srvptt.com/tgs-project/banner/jlpv3ncy8u555FR9wVtx6pRF3zE1vOrr.jpg"  /></div>
        <div ><img src="https://project.srvptt.com/tgs-project/banner/jlpv3ncy8u555FR9wVtx6pRF3zE1vOrr.jpg"  /></div>
          <div ><img src="https://project.srvptt.com/tgs-project/banner/jlpv3ncy8u555FR9wVtx6pRF3zE1vOrr.jpg"  /></div>
            <div ><img src="https://project.srvptt.com/tgs-project/banner/jlpv3ncy8u555FR9wVtx6pRF3zE1vOrr.jpg"  /></div>
     </div>
  </div>
</div>
`
const AppWrapper = () => {
 
  return (
    <React.Fragment>
      <style>{css}</style>
      { <div dangerouslySetInnerHTML={{ __html: html }} /> }
    </React.Fragment>
  );
};
export default AppWrapper;
