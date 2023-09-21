import React, { useState, useEffect, useCallback } from "react";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import { AccountService } from "@/api-services/services/AccountService";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useBaseProfile } from "@/hooks/account/useAccountProfile";
import Header from "@/components/Wap/components/Share/Header";
import Button from "@/components/Wap/components/Share/Button";
import BottomNote from "@/components/Wap/components/Share/BottomNote";
import Loading from "@/components/Wap/components/Share/Loading";
import { useNotifications } from "@/hooks/useNotifications";

type Props = {};
const NameForm = (props: Props) => {
  return <div>YOYO</div>;
};

// const NameForm = (props: any) => {
//   const { account, getIDCardNo, updateMemberCardNo, resetAccountResult } =
//     useAccountStore();
//   const { message, onTextChanged, loading } = useBaseProfile();
//
//   const [name, setName] = useState(account.info.member_name || "");
//   const [ic, setIC] = useState(account.info.member_card_no || "");
//   const [isConfigured, setIsConfigured] = useState<boolean>(checkIsConfigure());
//   const [icUpload, setICUpload] = useState("");
//   const [scene, setScene] = useState("");
//
//   const currentFormStatus = account.info.identityformstatus;
//   const hasSubmitted = account.info.identityformid ? true : false;
//
//   useEffect(() => {
//     if (currentFormStatus === 0 && !hasSubmitted) {
//       setScene("waiting-submit");
//     }
//     if ((currentFormStatus === 1 && hasSubmitted) || currentFormStatus === 1) {
//       setScene("approved");
//     }
//     if ((currentFormStatus === 2 && hasSubmitted) || currentFormStatus === 2) {
//       setScene("rejected");
//     }
//     if (currentFormStatus === 0 && hasSubmitted) {
//       setScene("waiting-verification");
//     }
//   }, [currentFormStatus, hasSubmitted]);
//
//   useEffect(() => {
//     if (account.info.member_card_no !== ic) {
//       setIC(account.info.member_card_no);
//       setIsConfigured(checkIsConfigure());
//     }
//   }, [account.info.member_card_no]);
//
//   useEffect(() => {
//     if (
//       account.updateCardResult !== null &&
//       account.updateCardResult !== undefined
//     ) {
//       if (account.updateCardResult.IsSuccess) {
//         if (config.features.ICVerificationUpload) {
//           AccountService.UploadIC(icUpload[0]).then((response) => {
//             if (!response.IsSuccess) {
//               props.alert("", response.info);
//             }
//           });
//         }
//         if (
//           account.info.identityformstatus !== account.info.identityformstatus
//         ) {
//           setScene("waiting-verification");
//         }
//         resetAccountResult();
//         // getIDCardNo()
//
//         props.appHistory.replace("/profile");
//       } else {
//         props.alert("", account.updateCardResult.info);
//         props.showLoading(false);
//       }
//     }
//   }, [account.updateCardResult, icUpload, props]);
//
//   const checkIsConfigure = () => {
//     let check_pass_account = false;
//     if (config.features.ICVerification) {
//       if (
//         account.info.member_name !== "" &&
//         account.info.member_name !== null
//       ) {
//         check_pass_account = account.info.check_pass_account;
//       }
//     } else {
//       check_pass_account = account.info.check_pass_account;
//     }
//
//     return check_pass_account;
//   };
//
//   const handleChangeName = useCallback((e) => {
//     setName(e.target.value);
//     onTextChanged();
//   }, []);
//
//   const handleChangeIC = useCallback((e) => {
//     setIC(e.target.value);
//     onTextChanged();
//   }, []);
//
//   const handleSubmitClicked = useCallback(async () => {
//     if (config.features.ICVerificationUpload && icUpload === "") {
//       return props.alert("", i18n.t("deposit.msgPlsSelectFile"));
//     }
//     const updatedName = name || "";
//     const updatedIC = ic || "";
//     props.showLoading(true);
//
//     await updateMemberCardNo(updatedName, updatedIC);
//     props.showLoading(false);
//   }, [name, ic, icUpload]);
//
//   const isDisableButton = useCallback(() => {
//     const updatedName = name || "";
//     const updatedIC = ic || "";
//
//     const disableButton = config.features.ICVerification
//       ? !(updatedName && updatedIC)
//       : updatedName === "";
//     return disableButton;
//   }, [name, ic]);
//
//   const handleFileChange = useCallback((e) => {
//     const files = e.target.files;
//     const fileName = e.target.value.toLowerCase();
//     if (files.length > 0) {
//       if (
//         !fileName.endsWith(".jpg") &&
//         !fileName.endsWith(".jpeg") &&
//         !fileName.endsWith(".png") &&
//         !fileName.endsWith(".tiff")
//       ) {
//         props.alert("", i18n.t("deposit.msgInvalidFileType"));
//         e.target.value = null;
//         return false;
//       }
//       const fileSize = Math.round(files[0].size / 1024);
//       if (fileSize > 5120) {
//         props.alert("", i18n.t("deposit.msgInvalidFileSize"));
//         e.target.value = null;
//       } else {
//         setICUpload(files);
//       }
//     }
//   }, []);
//
//   const handleGoEdit = useCallback(() => {
//     setScene("waiting-submit");
//   }, []);
//
//   const commonProps = {
//     name,
//     ic,
//     icUpload,
//     handleFileChange,
//     handleSubmitClicked,
//     handleChangeIC,
//     handleChangeName,
//   };
//
//   function sceneSwitcher(scene) {
//     switch (scene) {
//       case "waiting-verification":
//         return <Approved {...commonProps} />;
//       case "approved":
//         return <Approved {...commonProps} />;
//       default:
//         return <Default {...commonProps} icUpload={icUpload} />;
//     }
//   }
//
//   function bottomNoteSwitcher(scene) {
//     switch (scene) {
//       case "waiting-verification":
//         return (
//           <BottomNote
//             text1={i18n.t("profile.nameVerify.toEdit")}
//             toEdit={handleGoEdit}
//             text2={i18n.t("profile.nameVerify.editHere")}
//           ></BottomNote>
//         );
//       case "waiting-submit":
//         return <BottomNote empty></BottomNote>;
//       case "approved":
//         return <BottomNote text1={""} empty text2={""}></BottomNote>;
//       default:
//         return (
//           <BottomNote
//             text1={i18n.t("profile.nameVerify.toEdit")}
//             link={"../chat"}
//             text2={i18n.t("profile.nameVerify.editHere")}
//           ></BottomNote>
//         );
//     }
//   }
//
//   // return setupContent(
//   //   i18n.t("profile.nameVerify.title"),
//   //   sceneSwitcher(scene),
//   //   isConfigured && config.features.ICVerification && scene !== "waiting-submit"
//   //     ? i18n.t("common.configured")
//   //     : i18n.t("common.complete"),
//   //   config.features.Profile_DisplayEditNameButton
//   //     ? bottomNoteSwitcher(scene)
//   //     : null
//   // );
//
//   return (
//     <Container>
//       <Header
//         background={true}
//         token={null}
//         balance={0}
//         onBackClick={this.handleBackClick}
//         title={i18n.t("profile.nameVerify.title")}
//       ></Header>
//       YOYO
//       {message}
//       <Button
//         style={{ margin: "40px auto 0 auto" }}
//         disabled={this.checkButtonState() || this.state.disableButton}
//         onClick={this.handleSubmitClicked}
//         label={buttonTitle}
//       ></Button>
//       <Loading show={loading}></Loading>
//     </Container>
//   );
// };

export default NameForm;
