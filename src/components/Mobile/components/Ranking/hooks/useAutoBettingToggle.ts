import { useEffect, useState } from "react";

function generateRandomInterval() {
  return Math.floor(Math.random() * 17000) + 3000; // 3秒到20秒
}

export function useAutoBettingToggle() {
  const [autoBettingToggle, setAutoBettingToggle] = useState(false);

  useEffect(() => {
    let timeout: any;

    const bettingTimeout = () => {
      setAutoBettingToggle((prevState) => !prevState);
      timeout = setTimeout(bettingTimeout, generateRandomInterval());
    };

    timeout = setTimeout(bettingTimeout, generateRandomInterval());

    return () => {
      clearTimeout(timeout);
    };
  }, [autoBettingToggle]);

  return { autoBettingToggle };
}
