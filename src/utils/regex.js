import config from "../config/config";

var phone = (phone) => {
  var phoneRegex = new RegExp(
    `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
  );
  return phoneRegex.test(phone);
};

var verificationCode = (phone) => {
  var phoneRegex = new RegExp(` /^[a-zA-Z0-9]{6}$/`);
  return phoneRegex.test(phone);
};

export const regex = {
  phone,
  verificationCode,
};
