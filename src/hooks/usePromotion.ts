import { useAccountStore } from "./stores/useAccountStore"
import { useGeneralStore } from "./stores/useGeneralStore"

const usePromotion = () => {
  const { general } = useGeneralStore()
  const { account } = useAccountStore()

  const { promotionList: { items: promotionData } } = general
  const { info: { member_level_id } } = account

  const notLogin = member_level_id === 0 // TODO: 待確認未登入
  const displayPromotionList = notLogin ? promotionData : promotionData.filter((item) => item.vipLevels.includes(member_level_id))
  return {
    displayPromotionList
  }
}
export default usePromotion