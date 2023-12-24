import { useRef } from "react"

interface Props{
    pscripts:string[],
    select_script:(agr0:string)=>void
}

const Inputs = ({pscripts,select_script}:Props) => {
    const script_input = useRef<HTMLSelectElement>(null);
    function updateinputs(){
        console.log(script_input.current?.value)
        if(script_input.current)
            select_script(script_input.current.value)
    }
    return (<>
    <form onSubmit={updateinputs}>
        <select ref={script_input} onChange={updateinputs}>
            {pscripts.map((script: String)=>{return <option key={script.toString()}>{script}</option>})}
        </select>
    </form>
    </>)
}

export default Inputs;