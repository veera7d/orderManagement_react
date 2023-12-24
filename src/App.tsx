import { useState } from "react";
import OptionChain from "./components/OptionChain";
import Inputs from "./components/Inputs";

interface data_i {
  script: string;
  atm: number;
  step: number;
}

function App() {
  const [script, setScript] = useState<string>("NIFTY");
  const [no_of_strikes_disp, setNo_of_strikes_disp] = useState<number>(10);
  const [data, setData] = useState<data_i[]>([
    { script: "NIFTY", atm: 21000, step: 50 },
    { script: "BANKNIFTY", atm: 45000, step: 100 },
  ]);
  return (
    <>
      <Inputs
        pscripts={data.map((d) => {
          return d.script;
        })}
        select_script = {setScript}
      ></Inputs>
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
      />
    </>
  );
}

export default App;
