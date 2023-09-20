import { useSelector } from "react-redux";
import { ModalState } from "@/types/modal";
import { CLOSE_MODAL, SHOW_MODAL } from "@/api-services/constant/actionType";

export function useModalStore() {
  //@ts-ignore
  const modal: ModalState = useSelector((state) => state.modal);

  const showModal = async () => {
    return (dispatch) => {
      dispatch({
        type: SHOW_MODAL,
      });
    };
  };

  const closeModal = async () => {
    return (dispatch) => {
      dispatch({
        type: CLOSE_MODAL,
      });
    };
  };

  return {
    modal,
    showModal,
    closeModal,
  };
}
