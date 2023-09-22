import { ApiService } from "@/api-services/services/ApiService";
import config from "@/config/config";
import { AddRealNameResDto } from "@/models/dto/player/AddRealNameResDto";
import { LoginResDto } from "@/models/dto/player/LoginResDto";
import { LogoutResDto } from "@/models/dto/player/LooutResDto";
import { GetMemberInfoResDto } from "@/models/dto/player/GetMemberInfoResDto";
import { RegisterResDto } from "@/models/dto/player/RegisterResDto";
import { GetIDCardNoResDto } from "@/models/dto/pc/GetIDCardNoResDto";
import { GetPromoteUserResDto } from "@/models/dto/pc/GetPromoteUserResDto";
import { GetPromoteBillResDto } from "@/models/dto/pc/GetPromoteBillResDto";
import { GetRegisterStatusResDto } from "@/models/dto/player/GetRegisterStatusResDto";
import { NewRegisterResDto } from "@/models/dto/player/NewRegisterResDto";
import { UpdateMemberNameAndICResDto } from "@/models/dto/player/UpdateMemberNameAndICResDto";
import { UpdateIMResDto } from "@/models/dto/player/UpdateIMResDto";
import { SetBirthDateResDto } from "@/models/dto/player/SetBirthDateResDto";

export function useAccountService() {
  function CheckUserName(username: string) {
    return ApiService.get(`Player/checkUsername?=${username}`);
  }

  function Login(username: string, password: string) {
    return ApiService.post("Player/Login", {
      username: username,
      password: password,
      //@ts-ignore
      platformtype: config.isPC,
    }) as unknown as Promise<LoginResDto>;
  }

  function Register(
    username: string,
    pwd: string,
    confirmpwd: string,
    invitationcode = "",
    upper: any
  ) {
    const currency = config.currency;
    return ApiService.post("Player/create", {
      username,
      currency,
      pwd,
      confirmpwd,
      invitationcode,
      agent: true,
      //@ts-ignore
      testplayer: config.testplayer,
      upper,
    }) as unknown as Promise<RegisterResDto>;
  }

  function Activation(
    username: string,
    pwd: string,
    areacode: string,
    phone: string
  ) {
    return ApiService.post("player/init-phone", {
      username,
      pwd,
      areacode,
      phone,
    });
  }

  function VerifyActivation(securitykey: string, validatecode: string) {
    return ApiService.put("player/init-phone", {
      securitykey,
      validatecode,
    });
  }

  function ActivationEmail(email: string) {
    return ApiService.post("player/init-email", {
      email,
    });
  }

  function VerifyActivationEmail(securitykey: string, validatecode: string) {
    return ApiService.put("player/init-email", {
      securitykey,
      validatecode,
    });
  }

  async function Logout() {
    const response = (await ApiService.del(
      "Player/logout",
      {}
    )) as unknown as LogoutResDto;

    if (response.IsSuccess) {
      localStorage.removeItem("token");
    }

    return response;
  }

  function GetMemberInfo() {
    return ApiService.get(
      "Player/info"
    ) as unknown as Promise<GetMemberInfoResDto>;
  }

  function SetBirthDate(yyyymmdd: string) {
    return ApiService.patch("player/birthdate", {
      birthdate: yyyymmdd,
    }) as unknown as SetBirthDateResDto;
  }

  function UpdateIM(value: string, im: string, param: string) {
    return ApiService.patch(`Player/${im}`, {
      [param]: value,
    }) as unknown as Promise<UpdateIMResDto>;
  }

  function ChangeWithdrawalPassword(
    newpwd: string,
    validateCode: string,
    securityKey: string
  ) {
    return ApiService.patch("pay/password", {
      newpwd: newpwd,
      validatecode: validateCode,
      securitykey: securityKey,
    });
  }

  function AddRealName(name: string, id: string) {
    return ApiService.patch("player/identity", {
      realname: name,
      id: id,
    }) as unknown as Promise<AddRealNameResDto>;
  }

  function CheckRealName(id: string) {
    return ApiService.get(`Player/identity/check/${id}`);
  }

  function AddWithdrawalPassword(password: string) {
    return ApiService.post("pay/password", {
      pwd: password,
    });
  }

  function GetChangeWithdrawalPasswordVerificationCode() {
    return ApiService.post("pay/password/validate-code", {});
  }

  function VerifyEmail(email: string) {
    return ApiService.post("player/email", {
      email: email,
    });
  }

  function UpdateEmail(securitykey: string, validateCode: string) {
    return ApiService.put("player/email", {
      securitykey: securitykey,
      validatecode: validateCode,
    });
  }

  function VerifyPhone(phone: string, areacode: string) {
    return ApiService.post("player/phone", {
      phone: phone,
      area: areacode,
    });
  }

  function UpdatePhone(securitykey: string, validateCode: string) {
    return ApiService.put("player/phone", {
      securitykey: securitykey,
      validatecode: validateCode,
    });
  }

  function UpdatePassword(oldpwd: string, newpwd: string) {
    return ApiService.put("player/password", {
      oldpwd: oldpwd,
      newpwd: newpwd,
    });
  }

  function VerifyForgotPassword(
    email: string,
    areaCode: string,
    phone: string
  ) {
    return ApiService.post("player/password/forgot", {
      email: email,
      areaCode: areaCode,
      phone: phone,
    });
  }

  function ResetPassword(
    securitykey: string,
    validatecode: string,
    newpwd: string
  ) {
    return ApiService.post("player/password/reset", {
      securitykey: securitykey,
      validatecode: validatecode,
      newpwd: newpwd,
    });
  }

  function GetIDCardNo() {
    return ApiService.get(
      "pc/authentication"
    ) as unknown as Promise<GetIDCardNoResDto>;
  }

  function GetPromoteUser(page: number, limit: number) {
    return ApiService.get(
      `pc/user/promoteUser?page=${page}&page_size=${limit}`
    ) as unknown as Promise<GetPromoteUserResDto>;
  }

  function GetPromoteBill(page: number, limit: number) {
    return ApiService.get(
      `pc/userPromoteBill?page=${page}&page_size=${limit}`
    ) as unknown as Promise<GetPromoteBillResDto>;
  }

  function UpdateMemberName(token: string, name: string) {
    return ApiService.post(
      "member/editSurename",
      {
        name,
        token,
      },
      true
    );
  }

  function UpdateMemberNameAndIC(
    realname: string,
    id: string,
    file: File | null
  ) {
    const request = file
      ? ApiService.postFile(
          `player/identity/upload`,
          file,
          {
            realname,
            id,
          },
          true
        )
      : ApiService.patch(`player/identity`, {
          realname,
          id,
        });

    return request as unknown as Promise<UpdateMemberNameAndICResDto>;
  }

  function NewRegister(type: string, input: any) {
    return ApiService.post("player/register", {
      type: type,
      input: input,
    }) as unknown as Promise<NewRegisterResDto>;
  }

  function GetRegisterStatus() {
    return ApiService.get(
      "player/register"
    ) as unknown as Promise<GetRegisterStatusResDto>;
  }

  function UploadIC(file: File) {
    //@ts-ignore
    return ApiService.postFile(`player/identity/upload`, file, {});
  }

  return {
    CheckUserName,
    Login,
    Register,
    Activation,
    VerifyActivation,
    ActivationEmail,
    VerifyActivationEmail,
    Logout,
    GetMemberInfo,
    AddRealName,
    CheckRealName,
    ChangeWithdrawalPassword,
    AddWithdrawalPassword,
    GetChangeWithdrawalPasswordVerificationCode,
    VerifyEmail,
    UpdateEmail,
    VerifyPhone,
    UpdatePhone,
    UpdatePassword,
    VerifyForgotPassword,
    ResetPassword,
    GetIDCardNo,
    GetPromoteUser,
    GetPromoteBill,
    UpdateMemberName,
    UploadIC,
    SetBirthDate,
    NewRegister,
    UpdateIM,
    GetRegisterStatus,
    UpdateMemberNameAndIC,
  };
}
