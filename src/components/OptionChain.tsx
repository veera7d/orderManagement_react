import { useEffect, useState } from "react";
import OpStrike from "./OpStrike";
interface data_i {
  script: string;
  atm: number;
  step: number;
}

const buildstrikes = (atm: number, step: number) => {
  let s = [];
  for (let i = -10; i < 10; i++) {
    s.push(atm + step * i);
  }
  return s;
};

const OptionChain = ({ script, atm, step }: data_i) => {
  const [strikes, setStrikes] = useState<number[]>([]);
  useEffect(() => {
    let s = buildstrikes(atm, step);
    setStrikes(s);
  },[atm,step]);

  return (
    <>
      {strikes.map((s) => {
        return <OpStrike strike={s} key={s.toString()}></OpStrike>;
      })}
    </>
  );
};

export default OptionChain;
