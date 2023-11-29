const { performance } = require('perf_hooks');

// Measure the execution time of a function
const measureExecutionTime = (func, ...args) => {
  const startTime = performance.now();
  const result = func(...args);
  const endTime = performance.now();
  const timeTaken = endTime - startTime;

  console.log(`Execution time: ${timeTaken.toFixed(2)} milliseconds`);
  return result;
};

module.exports = { measureExecutionTime };