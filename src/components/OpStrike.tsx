import { useEffect, useRef, useState } from "react";

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
