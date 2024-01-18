import { useEffect, useState } from "react";
import OpStrike from "./OpStrike";
interface data_i {
  script: string;
  atm: number;
  step: number;
  no_of_strikes_disp:number
}

const buildstrikes = (atm: number, step: number ,no_of_strikes_disp:number) => {
  let s = [];
  for (let i = -no_of_strikes_disp; i <= no_of_strikes_disp; i++) {
    s.push(atm + step * i);
  }
  return s;
};

const OptionChain = ({ script, atm, step,no_of_strikes_disp }: data_i) => {
  const [strikes, setStrikes] = useState<number[]>([]);
  useEffect(() => {
    let s = buildstrikes(atm, step ,no_of_strikes_disp);
    setStrikes(s);
  },[atm,step,no_of_strikes_disp]);

  return (
    <>
      {strikes.map((s) => {
        return <OpStrike isatm={s==atm?true:false} strike={s} key={s.toString()}></OpStrike>
      })}
    </>
  );
};

export default OptionChain;
