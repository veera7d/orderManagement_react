import { useRef } from "react";

interface Props {
  pscripts: string[];
  select_script: (agr0: string) => void;
  select_no_strk: (agr0: number) => void;
}

const Inputs = ({ pscripts, select_script, select_no_strk }: Props) => {
  const script_input = useRef<HTMLSelectElement>(null);
  const no_of_strikes_disp_ref = useRef<HTMLInputElement>(null);
  function updateinputs() {
    if (script_input.current) select_script(script_input.current.value);
    if (no_of_strikes_disp_ref.current)
      select_no_strk(parseInt(no_of_strikes_disp_ref.current.value));
  }
  return (
    <>
      <form>
        <select ref={script_input} onChange={updateinputs}>
          {pscripts.map((script: String) => {
            return <option key={script.toString()}>{script}</option>
          })}
        </select>
        <label>Number of strikes to dicplay</label>
        <input
          type="number"
          ref={no_of_strikes_disp_ref}
          onChange={updateinputs}
          min={1}
          max={20}
          defaultValue={10}
        ></input>
      </form>
    </>
  )
};

export default Inputs;
