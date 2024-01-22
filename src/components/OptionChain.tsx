import { useEffect, useState } from "react";
import OpStrike from "./OpStrike";
interface data_i {
  script: string;
  atm: number;
  no_of_strikes_disp: number;
  active_oc_data: any;
}

interface opdata_i {
  strike: number;
  ce_ltp: number;
  pe_ltp: number;
  ce_token_obj: any;
  pe_token_obj: any;
}

const OptionChain = ({
  script,
  atm,
  no_of_strikes_disp,
  active_oc_data,
}: data_i) => {
  const [opdata, setOpdata] = useState<opdata_i[]>([]);
  useEffect(() => {
    let op_data_temp: any = [];
    const uniqueStrikeValues = new Set();
    active_oc_data.forEach((obj: any) => uniqueStrikeValues.add(obj.strike));
    const uniqueStrikeValuesArray = Array.from(uniqueStrikeValues);
    uniqueStrikeValuesArray.forEach((strike: any) => {
      op_data_temp.push({
        strike: strike / 100,
        ce_ltp: 0,
        pe_ltp: 0,
        ce_token_obj: null,
        pe_token_obj: null,
      });
    });
    active_oc_data.forEach((token_obj: any) => {
      op_data_temp.forEach((op_data: any) => {
        if (op_data.strike === token_obj.strike / 100) {
          if (token_obj.symbol.includes("CE")) op_data.ce_token_obj = token_obj;
          else if (token_obj.symbol.includes("PE"))
            op_data.pe_token_obj = token_obj;
        }
      });
    });
    op_data_temp.sort((obj1: opdata_i, obj2: opdata_i) => {
      return obj1.strike - obj2.strike;
    });
    // console.log("active_oc_data", active_oc_data);
    console.log("op_data_temp", op_data_temp.length);
    setOpdata(op_data_temp);
  }, [active_oc_data]);
  return (
    <>
      {opdata.map((opdata: any) => {
        return (
          <OpStrike
            isatm={parseInt(opdata.strike) == atm ? true : false}
            strike={opdata.strike}
            key={opdata.strike}
          ></OpStrike>
        );
      })}
    </>
  );
};

export default OptionChain;
