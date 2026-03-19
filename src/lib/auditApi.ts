export const scanPage = async (url: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    url,
    scannedAt: new Date().toISOString(),
    violations: [],
  };
};
