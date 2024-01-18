import { useEffect, useState } from "react";
import OptionChain from "./components/OptionChain";
import Inputs from "./components/Inputs";
import ltp from "./services/ltp";
import get_ATM_strike from "./util/util";
import AllScripts from "./components/AllScripts";
// import getAllList from "./services/db";
import WebSocketC from "./components/WebSocketC";

interface data_i {
  script: string;
  atm: number;
  ltp: number;
  step: number;
  token_obj: any;
}

function App() {
  const nifty_token_obj = {
    token: "99926000",
    symbol: "Nifty 50",
    name: "NIFTY",
    expiry: "",
    strike: "0.000000",
    lotsize: "1",
    instrumenttype: "AMXIDX",
    exch_seg: "NSE",
    tick_size: "0.000000",
  };
  const banknifty_token_obj = {
    token: "99926009",
    symbol: "Nifty Bank",
    name: "BANKNIFTY",
    expiry: "",
    strike: "0.000000",
    lotsize: "1",
    instrumenttype: "AMXIDX",
    exch_seg: "NSE",
    tick_size: "0.000000",
  };
  let count = 0;
  // let token_data=[];
  const [script, setScript] = useState<string>("NIFTY");
  const [no_of_strikes_disp, setNo_of_strikes_disp] = useState<number>(10);
  const [data, setData] = useState<data_i[]>([
    {
      script: "NIFTY",
      ltp: 0,
      atm: 21000,
      step: 50,
      token_obj: nifty_token_obj,
    },
    {
      script: "BANKNIFTY",
      ltp: 0,
      atm: 45000,
      step: 100,
      token_obj: banknifty_token_obj,
    },
  ]);
  // const ltpdata = useState<number[]>([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      new ltp()
        .getLtp(
          data.filter((d) => {
            return d.script === script;
          })[0].token_obj
        )
        .then((ltpdata): void => {
          setData((prev) => {
            return prev.map((d) => {
              if (d.script === script) {
                if (ltpdata !== undefined) {
                  d.atm = get_ATM_strike(ltpdata, d.step);
                  d.ltp = parseFloat(ltpdata.toString());
                }
              }
              return d;
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // getAllList.getAllList().then((data: any) => {
      //    console.log("data", data);
      // });
      // let token_data = localStorage.getItem("token_data") as string;
      // if (token_data) {
      //   console.log(
      //     JSON.parse(token_data).filter((d: any) => {
      //       return d.symbol === script;
      //     })[0]
      //   );
      // }
      // fetch("https://api.example.com/data")
      //   .then((response) => response.json())
      //   .then((newData) => setData(newData))
      //   .catch((error) => console.error(error));
    }, 10000);
    return () => clearInterval(intervalId);
  }, [script]);
  //<AllScripts />
  return (
    <>
      <WebSocketC data={data.filter((d) => d.script === "NIFTY")[0]} />
      <p>{JSON.stringify(data.filter((d) => d.script === "NIFTY")[0])}</p>
      <Inputs
        pscripts={data.map((d) => {
          //console.log(new ltp().getLtp(d.token_obj));
          return d.script;
        })}
        select_script={setScript}
        select_no_strk={setNo_of_strikes_disp}
      ></Inputs>
      
      {data.map((d) => {
        return (
          <p key={d.script}>
            {d.script}: {d.ltp}
          </p>
        );
      })}
      <OptionChain
        script={
          data.filter((d) => {
            return d.script === script;
          })[0].script
        }
        atm={
          data.filter((d) => {
            return d.script === script;
          })[0].atm
        }
        step={
          data.filter((d) => {
            return d.script === script;
          })[0].step
        }
        no_of_strikes_disp={no_of_strikes_disp}
      />
    </>
  );
}

export default App;
