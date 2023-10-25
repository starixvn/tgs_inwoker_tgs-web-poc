import Loading from "@/components/UI/Loading";
import { REDIRECT_PROMOTION_TYPE } from "@/constants/promotion";
import { AppHistory } from "@/history/History";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { media } from "@/theme/breakpoints";
import i18n from "@/utils/i18n";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button<{ $disabled: boolean }>`
  border: none;
  width: 100%;
  height: 100%;
  padding: 12px 20px 12px 20px;
  border-radius: 12px;
  gap: 10px;
  background: ${({ theme }) => theme.secondary};
  color: #ffffff;
  font-size: 1.25rem;
  cursor: pointer;
  background-image: ${({ $disabled }) => {
    return $disabled
      ? `
    opacity: 0.65;
    background-color: grey;
    cursor: not-allowed;`
      : ``;
  }};
  ${media.sm} {
    font-size: 2rem;
    max-width: 360px;
    max-height: 75px;
  }
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
    <Button onClick={handleJoinPromotion} $disabled={hasJoined}>
      Claim Bonus
    </Button>
  );
};

export default JoinPromotionButton;
