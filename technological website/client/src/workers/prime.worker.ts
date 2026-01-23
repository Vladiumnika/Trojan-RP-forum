self.onmessage = (e: MessageEvent) => {
  const { action, limit } = e.data;
  
  if (action === 'CALCULATE_PRIMES') {
    const start = performance.now();
    let count = 0;
    let current = 2;
    
    while (count < limit) {
      let isPrime = true;
      for (let i = 2; i <= Math.sqrt(current); i++) {
        if (current % i === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) count++;
      current++;
    }
    
    const end = performance.now();
    self.postMessage({ 
      type: 'RESULT', 
      primesFound: count, 
      timeTaken: (end - start).toFixed(2) 
    });
  }
};
