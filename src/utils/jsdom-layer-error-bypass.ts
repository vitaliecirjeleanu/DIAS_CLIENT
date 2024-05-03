// this is for "Error: Could not parse CSS stylesheet" which appears because
// CSS parser "cssom" that jsdom uses it does not support @layer
// https://github.com/primefaces/primeng/issues/14085

export function bypassLayerError() {
  const originalConsoleError = console.error;
  const jsDomCssError = 'Error: Could not parse CSS stylesheet';
  console.error = (...params) => {
    if (!params.find((p) => p.toString().includes(jsDomCssError))) {
      originalConsoleError(...params);
    }
  };
}
