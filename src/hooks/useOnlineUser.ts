import config from "@/config/config";
import { useEffect, useState } from "react";

const min = config.features.Home_OnlineUsers.min
const max = config.features.Home_OnlineUsers.max

const refreshTimeout = 5 * 1000

const randomNumberGenerator = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min) as number;
}

const useOnlineUser = () => {
  const defaultUserOnlineCount = Number(sessionStorage.getItem("userOnlineCount")) ?? null;
  const [onlineUser, setOnlineUser] = useState(defaultUserOnlineCount);

  const refreshOnlineUser = () => {
    const nextOnlineUser = randomNumberGenerator(
      min,
      max
    );
    setOnlineUser(nextOnlineUser);
    return nextOnlineUser;
  }

  useEffect(() => {
    if (onlineUser === null) {
      setTimeout(() => {
        const nextOnlineUser = refreshOnlineUser()
        sessionStorage.setItem("userOnlineCount", nextOnlineUser.toString());
      });
    }

    const interval = setInterval(() => {
      refreshOnlineUser()
    }, refreshTimeout);

    return () => {
      clearInterval(interval);
    };
  }, [onlineUser]);

  return {
    onlineUser
  };
}

export default useOnlineUser