import backIcon from "@/assets/t18/images/promotion/back.png";
import { Close as CloseIcon } from "@mui/icons-material";
import styled from "styled-components";

const DialogHeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 73px;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
  z-index: 1300;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BackIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

type Props = {
  handleClose: () => void;
  dialogHeaderTitle: string;
};

const DialogHeader = ({ dialogHeaderTitle, handleClose }: Props) => {
  return (
    <DialogHeaderContainer>
      {dialogHeaderTitle === "Promotion" ? (
        <BackIconContainer onClick={handleClose}>
          <img src={backIcon} alt="back" />
        </BackIconContainer>
      ) : (
        <CloseIconContainer onClick={handleClose}>
          <CloseIcon
            style={{
              color: "white",
              transform: "scale(1.6)",
            }}
          />
        </CloseIconContainer>
      )}

      {dialogHeaderTitle}
    </DialogHeaderContainer>
  );
};

export default DialogHeader;
