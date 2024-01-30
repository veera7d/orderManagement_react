import { useRef } from "react";

interface Props {
  pscripts: string[];
  expiries: string[];
  select_script: (agr0: string) => void;
  select_no_strk: (agr0: number) => void;
  setActive_exp: (agr0: string) => void;
}

const Inputs = ({
  pscripts,
  expiries,
  select_script,
  select_no_strk,
  setActive_exp,
}: Props) => {
  const script_input = useRef<HTMLSelectElement>(null);
  const exipres_input = useRef<HTMLSelectElement>(null);
  const no_of_strikes_disp_ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <form onSubmit={(event)=>{event.preventDefault();}}>
        <select
          ref={script_input}
          onChange={() => {
            if (script_input.current) select_script(script_input.current.value);
          }}
        >
          {pscripts.map((script: String) => {
            return <option key={script.toString()}>{script}</option>;
          })}
        </select>
        <select
          ref={exipres_input}
          onChange={() => {
            if (exipres_input.current) {
              setActive_exp(exipres_input.current.value);
            }
          }}
        >
          {expiries.map((exipre: String) => {
            return <option key={exipre.toString()}>{exipre}</option>;
          })}
        </select>
        <label>Number of strikes to display</label>
        <input
          type="number"
          ref={no_of_strikes_disp_ref}
          onChange={() => {
            if (no_of_strikes_disp_ref.current)
              select_no_strk(parseInt(no_of_strikes_disp_ref.current.value));
          }}
          min={1}
          max={100}
          defaultValue={10}
        ></input>
      </form>
    </>
  );
};

export default Inputs;
