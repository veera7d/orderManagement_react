import { useEffect, useRef, useState } from "react";
import placeOrder from "../services/orders";

interface Prop {
  strike: number;
  isatm: boolean;
  ce_token_obj: any;
  pe_token_obj: any;
  add_ltp_refs: any;
  quickLotSize: number;
}

const OpStrike = ({
  strike,
  isatm,
  ce_token_obj,
  pe_token_obj,
  add_ltp_refs,
  quickLotSize,
}: Prop) => {
  const ce_ref = useRef<HTMLDivElement>(null);
  const pe_ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ce_token_obj === null || ce_token_obj === undefined) return;
    if (ce_token_obj.ltp === null || ce_token_obj.ltp === undefined) return;
    add_ltp_refs([
      [ce_token_obj.token, ce_ref],
      [pe_token_obj.token, pe_ref],
    ]);
  }, [ce_token_obj, pe_token_obj]);
  function placeO(ce_pe: string, buy_sell: string, lot: number = quickLotSize) {
    console.log("placeOrder", ce_pe, buy_sell, lot);
    placeOrder(
      ce_pe === "CE" ? ce_token_obj : pe_token_obj,
      buy_sell,
      ce_token_obj.lotsize * lot
    );
  }
  return (
    <>
      <div
        className={
          isatm
            ? "border border-primary d-flex justify-content-center p-1 bg-info-subtle text-emphasis-info"
            : "border border-primary d-flex justify-content-center p-1 "
        }
      >
        <div
          className="text-end border border-primary border-opacity-50 rounded"
          style={{ width: "400px" }}
        >
          DRAGABLE
        </div>
        <div style={{ padding: "2px" }}>
          <button
            className="btn btn-success"
            onClick={() => {
              placeO("CE", "BUY", 1);
            }}
          >
            B
          </button>
        </div>
        <div style={{ padding: "2px" }}>
          <button
            className="btn btn-success"
            onClick={() => {
              placeO("CE", "BUY");
            }}
          >
            {quickLotSize}
          </button>
        </div>
        <div style={{ padding: "2px" }}>
          <button
            className="btn btn-danger"
            onClick={() => {
              placeO("CE", "SELL", 1);
            }}
          >
            S
          </button>
        </div>
        <div style={{ padding: "2px" }}>
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
          style={{ width: "70px", padding: "2px" }}
        >
          LTP
        </div>
        <div
          className="ext-center border border-primary border-opacity-50 rounded"
          style={{ width: "70px", padding: "2px" }}
        >
          {strike}
        </div>
        <div
          ref={pe_ref}
          className="text-center border border-primary border-opacity-50 rounded"
          style={{ width: "70px" }}
        >
          LTP
        </div>
        <div style={{ padding: "2px" }}>
          <button
            className="btn btn-success"
            onClick={() => {
              placeO("PE", "BUY", 1);
            }}
          >
            B
          </button>
        </div>
        <div style={{ padding: "2px" }}>
          <button
            className="btn btn-success"
            onClick={() => {
              placeO("PE", "BUY");
            }}
          >
            {quickLotSize}
          </button>
        </div>
        <div style={{ padding: "2px" }}>
          <button
            className="btn btn-danger"
            onClick={() => {
              placeO("PE", "SELL", 1);
            }}
          >
            S
          </button>
        </div>
        <div style={{ padding: "2px" }}>
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
          DRAGABLE
        </div>
      </div>
    </>
  );
};

export default OpStrike;
