import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

interface Props {
  placeO: any;
  enablepopup: boolean;
  set_ShowPopup: any;
  ce_pe: string;
  buy_sell: string;
}

const PopupOrder = ({
  placeO,
  enablepopup,
  set_ShowPopup,
  ce_pe,
  buy_sell,
}: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [numberValue, setNumberValue] = useState<number>(0);
  useEffect(() => {
    setShowPopup(enablepopup);
  }, [enablepopup]);
  return (
    <>
      <Popup
        open={showPopup}
        onClose={() => {
          setShowPopup(false);
          set_ShowPopup(false);
        }}
        closeOnDocumentClick
      >
        <div>
          <form
            onSubmit={(event) => {
              setShowPopup(false);
              set_ShowPopup(false);
              placeO("PE", "BUY", numberValue);
              event.preventDefault();
            }}
          >
            {/* <label htmlFor="numberInput">Enter a number:</label>
            <input
              type="number"
              id="numberInput"
              value={numberValue}
              min={1}
              onChange={(e) => setNumberValue(parseInt(e.target.value))}
            />
            <button className="btn btn-primary">Submit</button> */}
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="number of lots"
                aria-label="number of lots"
                aria-describedby="button-addon2"
                value={numberValue}
                min={1}
                onChange={(e) => setNumberValue(parseInt(e.target.value))}
              />
              <button
                className={
                  buy_sell === "BUY" ? "btn btn-success" : "btn btn-danger"
                }
                type="submit"
                id="button-addon2"
              >
                {buy_sell} {ce_pe}
              </button>
            </div>
          </form>
        </div>
      </Popup>
    </>
  );
};

export default PopupOrder;
