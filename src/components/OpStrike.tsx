interface Prop{
  strike:number;
  isatm:boolean
}

const OpStrike = ({strike,isatm}:Prop) => {
  return (
    <>
      <div className={isatm?"border border-primary d-flex justify-content-center p-1 bg-info-subtle text-emphasis-info":
      "border border-primary d-flex justify-content-center p-1 "}>
        <div
          className="text-end border border-primary border-opacity-50 rounded"
          style={{ width: "400px" }}
        >
          DRAGABLE
        </div>
        <div
          className="text-center border border-primary border-opacity-50 rounded"
          style={{ width: "70px" }}
        >
          LTP
        </div>
        <div
          className="ext-center border border-primary border-opacity-50 rounded"
          style={{ width: "70px" }} 
        >
          {strike}
        </div>
        <div
          className="text-center border border-primary border-opacity-50 rounded"
          style={{ width: "70px" }}
        >
          LTP
        </div>
        <div
          className="text-start border border-primary border-opacity-50 rounded"
          style={{ width: "400px" }}
        >
          DRAGABLE
        </div>
      </div>
    </>
  );
};

export default OpStrike;
