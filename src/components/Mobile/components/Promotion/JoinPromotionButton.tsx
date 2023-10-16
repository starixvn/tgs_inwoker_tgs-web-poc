import styled from "styled-components";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useSnackbar } from "notistack";
import { AppHistory } from "@/history/History";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useHistory } from "react-router-dom";
import { REDIRECT_PROMOTION_TYPE } from "@/components/Mobile/constants/promotion";
import { useState } from "react";
import Loading from "@/components/Mobile/components/UI/Loading";
import i18n from "@/utils/i18n";

const Button = styled.button`
  width: 384px;
  height: 53px;
  padding: 12px 20px 12px 20px;
  border-radius: 12px;
  gap: 10px;
  background: ${({ theme }) => theme.secondary};
  color: #ffffff;
  font-size: 1.25rem;
  curson: pointer;
  background-image: ${({ disabled }: { disabled: boolean }) => {
    return disabled
      ? `
    opacity: 0.65;
    background-color: grey;
    cursor: not-allowed;`
      : ``;
  }};
`;

const JoinPromotionButton = ({
  id,
  promotionType,
}: {
  id: string;
  promotionType: string;
}) => {
  const { joinPromotion } = useGeneralStore();
  const { enqueueSnackbar } = useSnackbar();
  const {
    account: { token },
  } = useAccountStore();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [hasJoined, setHasjoined] = useState(false);

  const handleJoinPromotion = async () => {
    if (token === null) history.push("/login");
    else {
      if (REDIRECT_PROMOTION_TYPE.indexOf(promotionType) >= 0) {
        AppHistory.push({
          pathname: "/deposit/" + id,
        });
      } else {
        setLoading(true);
        const {
          data: { success, error },
        } = await joinPromotion(id);
        setLoading(false);

        if (success) {
          enqueueSnackbar(i18n.t("promotion.joinSuccess"), {
            variant: "success",
          });
          setHasjoined(true);
        } else if (error === 0) {
          enqueueSnackbar(i18n.t("promotion.promoJoint"), {
            variant: "success",
          });
        }
      }
    }
  };

  if (loading) return <Loading show={true} />;

  return (
    <Button onClick={handleJoinPromotion} disabled={hasJoined}>
      Claim Bonus
    </Button>
  );
};

export default JoinPromotionButton;
