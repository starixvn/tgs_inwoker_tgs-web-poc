import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { VipData } from "@/models/dto/general/GetVipResDto";
import { useEffect, useState } from "react";

const useVipStore = () => {
  const { getVIP } = useGeneralStore();
  const [vipData, setVipData] = useState<VipData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGetVIP = async () => {
      try {
        setIsLoading(true);
        const getVipResDto = await getVIP();
        if (getVipResDto?.IsSuccess) {
          setVipData(getVipResDto?.data?.items);
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