import { useEffect, useRef, useState } from "react";
import placeOrder from "../services/orders";

interface Prop {
  strike: number;
  isatm: boolean;
  ce_token_obj: any;
  pe_token_obj: any;
  add_ltp_refs: any;
}

const OpStrike = ({
  strike,
  isatm,
  ce_token_obj,
  pe_token_obj,
  add_ltp_refs,
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
  function placeO(ce_pe: string, buy_sell: string) {
    console.log("placeOrder", ce_pe, buy_sell);
    placeOrder(
      ce_pe === "CE" ? ce_token_obj : pe_token_obj,
      buy_sell,
      ce_token_obj.lotsize
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
        <p>{ce_token_obj && ce_token_obj.token + pe_token_obj.token}</p>
        <div
          className="text-end border border-primary border-opacity-50 rounded"
          style={{ width: "400px" }}
        >
          DRAGABLE
        </div>
        <div>
          <button
            className="btn btn-success"
            onClick={() => {
              placeO("PE", "BUY");
            }}
          >
            B
          </button>
        </div>
        <div>
          <button
            className="btn btn-danger"
            onClick={() => {
              placeO("PE", "SELL");
            }}
          >
            S
          </button>
        </div>
        <div
          ref={ce_ref}
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
          ref={pe_ref}
          className="text-center border border-primary border-opacity-50 rounded"
          style={{ width: "70px" }}
        >
          LTP
        </div>
        <div>
          <button
            className="btn btn-success"
            onClick={() => {
              placeO("CE", "BUY");
            }}
          >
            B
          </button>
        </div>
        <div>
          <button
            className="btn btn-danger"
            onClick={() => {
              placeO("CE", "SELL");
            }}
          >
            S
          </button>
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
