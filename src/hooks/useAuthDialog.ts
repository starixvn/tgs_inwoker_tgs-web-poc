import { useContext } from "react";
import { AuthDialogContext } from "@/contexts/authContext";

export const useAuthDialog = () => useContext(AuthDialogContext);
