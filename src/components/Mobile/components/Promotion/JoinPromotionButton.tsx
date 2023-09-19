import styled from "styled-components";
import { themeList } from "@/theme";

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
`

const JoinPromotionButton = () => {
  
  const handleJoinPromotion = () => {
    console.log('%c⧭', 'color: #e50000', 'handleJoinPromotion');
  }

  return (
    <Button onClick={handleJoinPromotion}>
      Convide Agora
    </Button>
  )
}

export default JoinPromotionButton