const get_ATM_strike = (ltp: number, step: number) => {
  let rem = ltp % step;
  let base = ltp - rem;
  if (ltp > base + step / 2) {
    return base + step;
  }
  return base;
};

export default get_ATM_strike;
