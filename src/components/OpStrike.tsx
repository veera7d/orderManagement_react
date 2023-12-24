interface Prop{
  strike:number
}

const OpStrike = ({strike}:Prop) => {
  return (
    <>
      <div className="border border-primary d-flex justify-content-center p-1">
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
          className="text-center border border-primary border-opacity-50 rounded"
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
