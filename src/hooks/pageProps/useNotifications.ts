import { useContext } from "react";
import { NotificationContext } from "@/contexts/notificationContext";

export const useNotifications = () => useContext(NotificationContext);
