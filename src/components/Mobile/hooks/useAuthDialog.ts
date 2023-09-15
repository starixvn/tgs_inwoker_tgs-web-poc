import { useContext } from "react";
import { AuthDialogContext } from "@/components/Mobile/contexts/authContext";

export const useAuthDialog = () => useContext(AuthDialogContext);
