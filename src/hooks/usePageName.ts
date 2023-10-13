import { useContext } from "react";
import { PageNameContext } from "@/contexts/pageNameContext";

export const usePageName = () => useContext(PageNameContext);
