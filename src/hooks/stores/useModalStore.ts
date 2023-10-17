import { useDispatch, useSelector } from "react-redux";
import { ModalState } from "@/types/stores/modal";
import { CLOSE_MODAL, SHOW_MODAL } from "@/api-services/constant/actionType";

export function useModalStore() {
  const dispatch = useDispatch();

  //@ts-ignore
  const modal: ModalState = useSelector((state) => state.modal);

  const showModal = async () => {
    dispatch({
      type: SHOW_MODAL,
    });
  };

  const closeModal = async () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  return {
    modal,
    showModal,
    closeModal,
  };
}
