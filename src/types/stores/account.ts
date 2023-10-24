export interface InboxMessage {
  content: string;
  createon: string;
  id: string;
  isread: boolean;
  localization: {
    subject: string;
    content: string;
  } | null;
  subject: string;
}

export interface AccountState {
  pending: boolean;
  updateCardResult: null | any;
  registercompleted: boolean | string;
  info: {
    balance: number;
    member_card_no: string | null;
    member_id: number;
    member_level_id: number;
    member_name: null | string;
    member_username: string;
    member_birthday: string;
    member_email: null | string;
    member_phone: null | string;
    member_safe_password: string;
    member_address: string;
    member_address_surename: string;
    member_address_phone: string;
    member_question: string;
    member_qq: null | string;
    member_wechat: null | string;
    member_fb: null | string;
    member_telegram: null | string;
    member_line: null | string;
    member_viber: null | string;
    member_whatsapp: null | string;
    can_withdrawal: string;
    bonus_num: string;
    message_num: number;
    check_pass_account: boolean;
    check_pass_email: boolean;
    check_pass_phone: boolean;
    promote_code: string;
    promote_url: string;
    month_vip: {
      id: number;
      curr_title: string;
      curr_owned_point: string;
      next_title: string;
      next_point: string;
      require_point: string;
      vip_progress_bar: number;
    };
    year_vip: {
      id: number;
      curr_title: string;
      curr_owned_point: string;
      next_title: string;
      next_point: string;
      require_point: string;
      vip_progress_bar: number;
    };
    token: string;
    logintime: string;
    member_last_login: string;
    member_birthdate: string | null;
    playercode: string;
    identityformstatus: number;
    identityformid: string;
    bankInfoAuthentication: boolean;
  } & {
    [key in string]: string;
  };
  vip: {
    member: string;
    next_vip_title: string;
    owned_point: string;
    next_point: string;
    require_point: string;
    vip_progress_bar: number;
    curr_vip: {
      id: number;
      title: string;
      upgrade_gift_amount: string;
      upgrade_gift_multiple: string;
      birthday_gift_amount: string;
      birthday_gift_multiple: string;
      topped_gift_amount: string;
      topped_gift_multiple: string;
      deposit_bonus: string;
      deposit_bonus_limit: string;
      deposit_bonus_multiple: string;
      rescue_amount: string;
      rescue_amount_limit: string;
      rescue_amount_multiple: string;
      free_withdrawal_num: number;
    };
    next_vip: {
      id: string;
      title: string;
      upgrade_gift_amount: string;
      upgrade_gift_multiple: string;
      birthday_gift_amount: string;
      birthday_gift_multiple: string;
      topped_gift_amount: string;
      topped_gift_multiple: string;
      deposit_bonus: string;
      deposit_bonus_limit: string;
      deposit_bonus_multiple: string;
      rescue_amount: string;
      rescue_amount_limit: string;
      rescue_amount_multiple: string;
      free_withdrawal_num: number;
    };
  };
  inbox: {
    items: InboxMessage[];
    totalcount: number;
  };
  promote_user: {
    list: any[];
    count: number;
  };
  promote_bill: {
    list: any[];
    count: 0;
  };
  token: string | null;
  logintime: null | string;
  error: null | any;
  loading: boolean;
}
