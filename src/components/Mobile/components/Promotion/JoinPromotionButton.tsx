import styled from "styled-components";
import { themeList } from "@/theme";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useSnackbar } from "notistack";

const theme = themeList["mobileT18"];

const Button = styled.button`
  width: 384px;
  height: 53px;
  padding: 12px 20px 12px 20px;
  border-radius: 12px;
  gap: 10px;
  background: ${theme.secondary};
  color: #ffffff;
  font-size: 1.25rem;
`;

const JoinPromotionButton = ({ id }: { id: string }) => {
  const { joinPromotion } = useGeneralStore();
  const { enqueueSnackbar } = useSnackbar();

  const handleJoinPromotion = () => {
    // TODO: 待確認行為
    // enqueueSnackbar("success!!!", {
    //   variant: "success",
    // });
  };

  return <Button onClick={handleJoinPromotion}>Convide Agora</Button>;
};

export default JoinPromotionButton;
