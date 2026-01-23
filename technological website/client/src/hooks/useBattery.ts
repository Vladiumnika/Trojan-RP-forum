import { useState, useEffect } from 'react';

export function useBattery() {
  const [battery, setBattery] = useState<{ level: number, charging: boolean } | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (navigator.getBattery) {
      // @ts-ignore
      navigator.getBattery().then((batt) => {
        const updateBattery = () => {
            setBattery({
                level: batt.level,
                charging: batt.charging
            });
        };
        updateBattery();
        batt.addEventListener('levelchange', updateBattery);
        batt.addEventListener('chargingchange', updateBattery);
      });
    }
  }, []);

  return battery;
}
