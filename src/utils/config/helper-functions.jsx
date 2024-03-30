export const calculateAmountAfterTDS = (amount) => {
  let tds = amount * 0.01;
  let amountAfterTDS = amount + tds;
  return amountAfterTDS;
};
