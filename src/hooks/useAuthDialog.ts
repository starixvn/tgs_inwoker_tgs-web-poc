import { useContext } from "react";
import { AuthDialogContext } from "@/contexts/authDialogContext";

export const useAuthDialog = () => useContext(AuthDialogContext);
