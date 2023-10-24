import { GeneralState } from "@/types/stores/general";
import { UiState } from "@/types/stores/ui";
import { AccountState } from "@/types/stores/account";
import { BonusState } from "@/types/stores/bonus";
import { ModalState } from "@/types/stores/modal";
import { WalletState } from "@/types/stores/wallet";
import { GameState } from "@/types/stores/game";

export interface RootState {
  ui: UiState;
  account: AccountState;
  bonus: BonusState;
  modal: ModalState;
  general: GeneralState;
  wallet: WalletState;
  game: GameState;
}
