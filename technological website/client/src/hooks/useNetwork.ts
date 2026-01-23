import { useState, useEffect } from 'react';

export function useNetwork() {
  const [network, setNetwork] = useState<{ effectiveType: string, downlink: number, rtt: number } | null>(null);

  useEffect(() => {
    const conn = (navigator as any).connection;
    if (conn) {
      const update = () => setNetwork({ 
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt
      });
      update();
      conn.addEventListener('change', update);
      return () => conn.removeEventListener('change', update);
    }
  }, []);

  return network;
}
