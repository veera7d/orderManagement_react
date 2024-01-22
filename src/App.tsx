import { useEffect, useState } from "react";
import OptionChain from "./components/OptionChain";
import Inputs from "./components/Inputs";
import ltp from "./services/ltp";
import get_ATM_strike from "./util/util";
import AllScripts from "./components/AllScripts";
import WebSocketC from "./components/WebSocketC";

interface oc_ltp_i {
  strike: string;
  token: string;
  ce_ltp: number;
  pe_ltp: number;
}

interface data_i {
  script: string;
  atm: number;
  ltp: number;
  step: number;
  token_obj: any;
  unique_expirys: string[];
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
  const [script, setScript] = useState<string>("NIFTY");
  const [data, setData] = useState<data_i[]>([
    {
      script: "NIFTY",
      ltp: 0,
      atm: 21000,
      step: 50,
      token_obj: nifty_token_obj,
      unique_expirys: [],
    },
    {
      script: "BANKNIFTY",
      ltp: 0,
      atm: 45000,
      step: 100,
      token_obj: banknifty_token_obj,
      unique_expirys: [],
    },
  ]);
  const [nifty_data, setNifty_data] = useState<any[]>([]);
  const [banknifty_data, setBanknifty_data] = useState<any[]>([]);
  useEffect(() => {
    // console.log("niftydatalength----", nifty_data.length);
    // console.log("unique_expirys", data[0].unique_expirys);
  }, [nifty_data, banknifty_data, data]);

  const [oc_ltp, setOc_ltp] = useState<oc_ltp_i[]>([]);
  const { subscribe, unsubscribe, subscribe_all, unSubscribe_all } = WebSocketC(
    oc_ltp,
    setOc_ltp
  );
  const [active_oc_data, setActive_oc_data] = useState<any[]>([]);
  const [active_exp, setActive_exp] = useState<string>();
  const [no_of_strikes_disp, setNo_of_strikes_disp] = useState<number>(10);
  useEffect(() => {
    // console.log("active_oc_data", active_oc_data);
  }, [active_oc_data]);
  const update_allscripts = AllScripts(set_nifty_data, set_banknifty_data);
  useEffect(() => {
    update_allscripts();
  }, []);

  function set_nifty_data(_data: any) {
    setNifty_data(_data);
    setData((data) => {
      return data.map((d) => {
        if (d.script === "NIFTY") {
          d.unique_expirys = Array.from(
            new Set(
              _data.map((d: any) => {
                return d.expiry;
              })
            )
          );
        }
        return d;
      });
    });
  }
  function set_banknifty_data(_data: any) {
    setBanknifty_data(_data);
    setData((data) => {
      return data.map((d) => {
        if (d.script === "BANKNIFTY") {
          d.unique_expirys = Array.from(
            new Set(
              _data.map((d: any) => {
                return d.expiry;
              })
            )
          );
        }
        return d;
      });
    });
  }

  let token_ltp: { token: string; ltp: number }[] = [];
  function settoket_ltp(data: { token: string; ltp: number }[]) {
    token_ltp = data;
  }

  //subscribe to ltp
  useEffect(() => {
    if (active_oc_data.length > 0) {
      // console.log("active_oc_data", active_oc_data.length);
      unSubscribe_all(active_oc_data);
    }
    if (script === "NIFTY") {
      if (active_exp === undefined || active_exp === null) {
        setActive_exp(() => {
          let out = data.filter((d: any) => d.script === "NIFTY")[0]
            .unique_expirys[0];
          return out;
        });
      }

      setActive_oc_data(() => {
        const out = nifty_data.filter((d: any) => {
          return d.expiry === active_exp;
        });
        return out;
      });
    } else if (script === "BANKNIFTY") {
      if (active_exp === undefined || active_exp === null) {
        setActive_exp(() => {
          let out = data.filter((d: any) => d.script === "BANKNIFTY")[0]
            .unique_expirys[0];
          return out;
        });
      }
      setActive_oc_data(() => {
        const out = banknifty_data.filter((d: any) => {
          return d.expiry === active_exp;
        });
        return out;
      });
    }
    if (active_oc_data.length > 0) {
    }
  }, [script, active_exp]);

  useEffect(() => {
    if (active_oc_data.length > 0) {
      console.log("active_oc_data", active_oc_data.length);
      subscribe_all(active_oc_data);
    }
  }, [active_oc_data]);
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
    }, 10000);
    return () => clearInterval(intervalId);
  }, [script]);
  //<AllScripts />
  //<WebSocketC data={data.filter((d) => d.script === "NIFTY")[0]} />
  return (
    <>
      <p>
        {JSON.stringify(
          data.filter((d) => d.script === "NIFTY")[0].unique_expirys
        )}
      </p>
      <p>{active_exp}</p>
      <Inputs
        pscripts={data.map((d) => {
          return d.script;
        })}
        expiries={
          data.filter((d) => {
            return d.script === script;
          })[0].unique_expirys
        }
        select_script={setScript}
        select_no_strk={setNo_of_strikes_disp}
        setActive_exp={setActive_exp}
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
        active_oc_data={active_oc_data}
        no_of_strikes_disp={no_of_strikes_disp}
      />
    </>
  );
}

export default App;
