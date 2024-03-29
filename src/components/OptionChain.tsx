import { useEffect, useRef, useState } from "react";
import { placeOrder, getPosition } from "../services/orders";
import OpStrike from "./OpStrike";
interface data_i {
  script: string;
  atm: number;
  no_of_strikes_disp: number;
  active_oc_data: any;
  add_ltp_refs: any;
  data: any;
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
  add_ltp_refs,
  data,
}: data_i) => {
  const freezQty = {
    NIFTY: 36,
    BANKNIFTY: 60,
  };
  const [openPositions, setOpenPositions] = useState<any[]>([]);
  const [opdata, setOpdata] = useState<opdata_i[]>([]);
  const [quickLotSize, setQuickLotSize] = useState<number>(1);
  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    let op_data_temp: any = [];
    const uniqueStrikeValues = new Set();
    active_oc_data.forEach((obj: any) => uniqueStrikeValues.add(obj.strike));
    const uniqueStrikeValuesArray = Array.from(uniqueStrikeValues);
    uniqueStrikeValuesArray.forEach((strike: any) => {
      op_data_temp.push({
        strike: strike / 100,
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
    setOpdata(op_data_temp);
  }, [active_oc_data]);
  useEffect(() => {
    setInterval(() => {
      getPosition().then((data) => {
        if (data === null || data === undefined) {
          setOpenPositions([]);
          return;
        }
        data = data
          .filter((item: any) => item.exchange === "NFO")
          .map((item: any) => {
            return {
              token: item.symboltoken,
              buyqty: item.buyqty,
              sellqty: item.sellqty,
            };
          });
        // console.log("getPosition", data);
        setOpenPositions(data);
      });
    }, import.meta.env.VITE_POSTIONS_UPDATE_FREQUENCY_SEC * 1000);
  }, []);
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label>Quick Lot Size</label>
        <input
          type="number"
          defaultValue={1}
          min={1}
          onChange={(e) => {
            setQuickLotSize(parseInt(e.target.value));
          }}
        ></input>
      </form>
      <label>Ltp not updating? HIT refresh button </label>
      <button
        className="btn btn-success"
        onClick={() => {
          setRefresh(!refresh);
        }}
      >
        Refresh
      </button>
      <table style={{ border: "1px solid", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid", padding: "0px 25% 0px 25%" }}>
              CE
            </th>
            <th style={{ border: "1px solid", padding: "0px 25% 0px 25%" }}>
              PE
            </th>
          </tr>
        </thead>
      </table>
      {opdata.map((_opdata: any) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].script === script) {
            let temp = Math.abs(atm - _opdata.strike) / data[i].step;
            if (temp > no_of_strikes_disp) {
              return;
            }
          }
        }
        return (
          <OpStrike
            script={script}
            isatm={parseInt(_opdata.strike) == atm ? true : false}
            strike={_opdata.strike}
            ce_token_obj={_opdata.ce_token_obj}
            pe_token_obj={_opdata.pe_token_obj}
            add_ltp_refs={add_ltp_refs}
            key={_opdata.strike}
            quickLotSize={quickLotSize}
            freezQty={freezQty}
            openPositions={openPositions}
            no_of_strikes_disp={no_of_strikes_disp}
            refresh={refresh}
          ></OpStrike>
        );
      })}
    </>
  );
};

export default OptionChain;
