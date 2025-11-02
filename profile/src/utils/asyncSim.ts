export const simulateAsyncAction = (delay: number = 1500): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
          resolve();
        
      }, delay);
    });
  };