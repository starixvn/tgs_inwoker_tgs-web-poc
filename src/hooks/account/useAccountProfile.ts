import { useState } from "react";
import { UPDATE_INFO } from "@/api-services/constant/actionType";
import i18n from "@/utils/i18n";
import { useDispatch } from "react-redux";

function duplicateText(count: number): string {
  let value = "";
  for (let i = 0; i < count; i++) {
    value += "*";
  }
  return value;
}

function maskString(value: string, start: number, end: number): string {
  let newValue = value;
  if (end > start) {
    if (value.length > end) {
      newValue =
        value.substring(0, start) +
        duplicateText(end - start) +
        value.substring(end, value.length);
    }
  }
  return newValue;
}

export function useBaseProfile() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null); // 添加类型注解
  let isTextChanged = false;

  const updateInfo = (payload: any) => {
    dispatch({
      type: UPDATE_INFO,
      payload: payload,
    });
    // handleBackClick(appHistory);
  };

  const checkButtonState = (isDisableButton: () => boolean) => {
    if (isTextChanged) return false; // always disable if text not changed
    return isDisableButton();
  };

  const onTextChanged = () => {
    isTextChanged = true;
    if (message != null && message.length > 0) {
      setMessage(null); // clear
    }
  };

  const showErrorMessage = (errorMessage: string) => {
    setMessage(errorMessage);
  };

  const showLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return {
    updateInfo: updateInfo,
    checkButtonState: checkButtonState,
    onTextChanged: onTextChanged,
    showErrorMessage: showErrorMessage,
    showLoading: showLoading,
    loading: loading,
    message: message,
  };
}
