import { useContext } from "react";
import { HeaderContext } from "@/contexts/headerContext";

export const useHeader = () => useContext(HeaderContext);
