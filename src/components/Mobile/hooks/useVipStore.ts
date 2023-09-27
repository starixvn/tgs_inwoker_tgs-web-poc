import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useEffect, useState } from "react";

export type VipData = {
    birthBenefit: number;
    cardGameRebate: number;
    level: number;
    levelKeepAccumulateBetAmount: number;
    levelKeepAccumulateDeposit: number;
    levelUpAccumulateBetAmount: number;
    levelUpAccumulateDeposit: number;
    liveDealerRebate: number;
    lotteryRebate: number;
    promotionBenefit: number;
    quarterlyBenefit: number;
    slotRebate: number;
    sportsRebate: number;
    virtualSportsRebate: number;
};

const useVipStore = () => {
    const { getVIP } = useGeneralStore();
    const [vipData, setVipData] = useState<VipData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchGetVIP = async () => {
            try {
                setIsLoading(true);
                const result = await getVIP();
                if (result?.IsSuccess) {
                    setVipData(result?.data?.items);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching VIP api:", error);
            }
        };
        fetchGetVIP();
    }, []);

    return {
        setVipData,
        vipData,
        isLoading
    };
};

export default useVipStore;