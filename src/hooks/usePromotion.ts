import { useGeneralStore } from "./stores/useGeneralStore"

const usePromotion = () => {
  const { general } = useGeneralStore()

  const { promotionList: { items: promotionData } } = general

  const displayPromotionList = promotionData.sort((a, b) => a.order - b.order)

  return {
    displayPromotionList
  }
}
export default usePromotion