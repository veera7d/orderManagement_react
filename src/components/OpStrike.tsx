import { useEffect, useRef, useState } from "react";
import { placeOrder, getPosition } from "../services/orders";
import Popup from "reactjs-popup";
import PopupOrder from "./PopupOrder";

interface Prop {
  script: string;
  strike: number;
  isatm: boolean;
  ce_token_obj: any;
  pe_token_obj: any;
  add_ltp_refs: any;
  quickLotSize: number;
  freezQty: { [key: string]: number };
  openPositions: any[];
  no_of_strikes_disp: number;
  refresh: boolean;
}

const OpStrike = ({
  script,
  strike,
  isatm,
  ce_token_obj,
  pe_token_obj,
  add_ltp_refs,
  quickLotSize,
  freezQty,
  openPositions,
  no_of_strikes_disp,
  refresh,
}: Prop) => {
  const ce_ref = useRef<HTMLDivElement>(null);
  const pe_ref = useRef<HTMLDivElement>(null);
  const [ce_pos, setCe_pos] = useState<any>({});
  const [pe_pos, setPe_pos] = useState<any>({});
  const [showPopup, setShowPopup] = useState(false);
  const [ce_pe, setCe_pe] = useState<string>("");
  const [buy_sell, setBuy_sell] = useState<string>("");
  useEffect(() => {
    if (ce_token_obj === null || ce_token_obj === undefined) return;
    if (ce_token_obj.token === null || ce_token_obj.token === undefined) return;
    add_ltp_refs([
      [ce_token_obj.token, ce_ref],
      [pe_token_obj.token, pe_ref],
    ]);
  }, [no_of_strikes_disp, refresh]);
  useEffect(() => {
    setCe_pos(
      openPositions.filter((d) => {
        return d.token === ce_token_obj.token;
      })[0]
    );
    setPe_pos(
      openPositions.filter((d) => {
        return d.token === pe_token_obj.token;
      })[0]
    );
  }, [openPositions]);
  function placeO(ce_pe: string, buy_sell: string, lot: number = quickLotSize) {
    let rem = lot % freezQty[script as keyof typeof freezQty];
    let no_orders = (lot - rem) / freezQty[script as keyof typeof freezQty];
    console.log("placeOrder", ce_pe, buy_sell, no_orders, rem);
    if (rem != 0) {
      placeOrder(
        ce_pe === "CE" ? ce_token_obj : pe_token_obj,
        buy_sell,
        ce_token_obj.lotsize * rem
      );
    }
    for (let i = 0; i < no_orders; i++) {
      placeOrder(
        ce_pe === "CE" ? ce_token_obj : pe_token_obj,
        buy_sell,
        ce_token_obj.lotsize * freezQty[script as keyof typeof freezQty]
      );
    }
  }
  return (
    <>
      <PopupOrder
        placeO={placeO}
        enablepopup={showPopup}
        buy_sell={buy_sell}
        ce_pe={ce_pe}
        set_ShowPopup={setShowPopup}
      />
      <div
        className={
          isatm
            ? "border border-primary d-flex justify-content-center p-1 bg-info-subtle text-emphasis-info"
            : "border border-primary d-flex justify-content-center p-1 "
        }
        style={{ height: "50px" }}
      >
        <p>{ce_token_obj && ce_token_obj.token}</p>
        <div
          className="text-end border border-primary border-opacity-50 rounded"
          style={{ width: "400px" }}
        >
          {ce_pos &&
            JSON.stringify({ buy: ce_pos.buyqty, sell: ce_pos.sellqty })}
        </div>
        <div style={{ padding: "0px 2px 0px 2px" }}>
          <button
            className="btn btn-success"
            onClick={() => {
              setCe_pe("CE");
              setBuy_sell("BUY");
              setShowPopup(true);
              // placeO("CE", "BUY", 1);
            }}
          >
            B
          </button>
        </div>
        <div style={{ padding: "0px 2px 0px 2px" }}>
          <button
            className="btn btn-success"
            onClick={() => {
              placeO("CE", "BUY");
            }}
          >
            {quickLotSize}
          </button>
        </div>
        <div style={{ padding: "0px 2px 0px 2px" }}>
          <button
            className="btn btn-danger"
            onClick={() => {
              setCe_pe("CE");
              setBuy_sell("SELL");
              setShowPopup(true);
              // placeO("CE", "SELL", 1);
            }}
          >
            S
          </button>
        </div>
        <div style={{ padding: "0px 2px 0px 2px" }}>
          <button
            className="btn btn-danger"
            onClick={() => {
              placeO("CE", "SELL");
            }}
          >
            {quickLotSize}
          </button>
        </div>
        <div
          ref={ce_ref}
          className="text-center border border-primary border-opacity-50 rounded"
          style={{ width: "170px", padding: "0px 2px 0px 2px" }}
        >
          LTP
        </div>
        <div
          className="ext-center border border-primary border-opacity-50 rounded"
          style={{ width: "70px", padding: "0px 2px 0px 2px" }}
        >
          {strike}
        </div>
        <div
          ref={pe_ref}
          className="text-center border border-primary border-opacity-50 rounded"
          style={{ width: "170px" }}
        >
          LTP
        </div>
        <div style={{ padding: "0px 2px 0px 2px" }}>
          <button
            className="btn btn-success"
            onClick={() => {
              setCe_pe("PE");
              setBuy_sell("BUY");
              setShowPopup(true);
              // placeO("PE", "BUY", 1);
            }}
          >
            B
          </button>
        </div>
        <div style={{ padding: "0px 2px 0px 2px" }}>
          <button
            className="btn btn-success"
            onClick={() => {
              placeO("PE", "BUY");
            }}
          >
            {quickLotSize}
          </button>
        </div>
        <div style={{ padding: "0px 2px 0px 2px" }}>
          <button
            className="btn btn-danger"
            onClick={() => {
              setCe_pe("PE");
              setBuy_sell("SELL");
              setShowPopup(true);
              // placeO("PE", "SELL", 1);
            }}
          >
            S
          </button>
        </div>
        <div style={{ padding: "0px 2px 0px 2px" }}>
          <button
            className="btn btn-danger"
            onClick={() => {
              placeO("PE", "SELL");
            }}
          >
            {quickLotSize}
          </button>
        </div>
        <div
          className="text-start border border-primary border-opacity-50 rounded"
          style={{ width: "400px", padding: "0px 2px 0px 2px" }}
        >
          {pe_pos &&
            JSON.stringify({ buy: pe_pos.buyqty, sell: pe_pos.sellqty })}
        </div>
        <p>{pe_token_obj && pe_token_obj.token}</p>
      </div>
    </>
  );
};

export default OpStrike;
