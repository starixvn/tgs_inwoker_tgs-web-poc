import { ApiService } from "@/api-services/services/ApiService";
import { GetMarqueeResDto } from "@/models/dto/ui/GetMarqueeResDto";
import { GerMaintenanceResDto } from "@/models/dto/ui/GetMaintenanceResDto";

export function useUiService() {
  function GetMarquee(language) {
    return ApiService.get(
      `announcement/list/${language}`
    ) as unknown as Promise<GetMarqueeResDto>;
  }

  function GetMaintenance() {
    return ApiService.get(
      `brand/maintenance`
    ) as unknown as Promise<GerMaintenanceResDto>;
  }

  return {
    GetMarquee,
    GetMaintenance,
  };
}
