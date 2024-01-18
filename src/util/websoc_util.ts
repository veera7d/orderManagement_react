import { Parser } from "binary-parser";
// import Parser from 'binary-parser';
import { Buffer } from "buffer";

const exchange_type = (exchange: any) => {
  switch (exchange) {
    case "NSE":
      return 1;
    case "NFO":
      return 2;
    case "BSE":
      return 3;
    case "MCX":
      return 5;
  }
};

export const build_websoc_ltpreq = (token_obj: any, subscribe = true) => {
  console.log("token_obj", token_obj);
  return {
    correlationID: token_obj.token,
    action: subscribe ? 1 : 0,
    params: {
      mode: 1,
      tokenList: [
        {
          exchangeType: exchange_type(token_obj.exch_seg),
          tokens: [token_obj.token],
        },
      ],
    },
  };
};

export function QUOTE(buf: any) {
  const quote = new Parser()
    .endianess("little")
    // @ts-ignore
    .uint8("subscription_mode", { formatter: toNumber, length: 1 })
    // @ts-ignore
    .uint8("exchange_type", { formatter: toNumber, length: 1 })
    // @ts-ignore
    .array("token", { type: "int8", length: 25, formatter: _atos })
    // @ts-ignore
    .uint64("sequence_number", { formatter: toNumber, length: 8 })
    // @ts-ignore
    .uint64("exchange_timestamp", { formatter: toNumber, length: 8 })
    // @ts-ignore
    .uint64("last_traded_price", { formatter: toNumber, length: 8 })
    // @ts-ignore
    .int64("last_traded_quantity", { formatter: toNumber, length: 8 })
    // @ts-ignore
    .int64("avg_traded_price", { formatter: toNumber, length: 8 })
    // @ts-ignore
    .int64("vol_traded", { formatter: toNumber, length: 8 })
    // @ts-ignore
    .doublele("total_buy_quantity", { formatter: toNumber, length: 8 })
    // @ts-ignore
    .doublele("total_sell_quantity", { formatter: toNumber, length: 8 })
    // @ts-ignore
    .int64("open_price_day", { formatter: toNumber, length: 8 })
    // @ts-ignore
    .int64("high_price_day", { formatter: toNumber, length: 8 })
    // @ts-ignore
    .int64("low_price_day", { formatter: toNumber, length: 8 })
    .int64("close_price", {
      formatter: toNumber,
      // @ts-ignore
      length: 8,
    });

  return quote.parse(buf);
}

export async function LTP(buf: Blob) {
  const arrayBuffer1 = await buf.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer1);
  // console.log("uint8Array", uint8Array);
  const buffer = Buffer.from(uint8Array); // Convert Uint8Array to Buffer
  const ltpParser = new Parser()
    .endianess("little")
    .int8("subscription_mode", { formatter: toNumber })
    .int8("exchange_type", { formatter: toNumber })
    .array("token", {
      type: "uint8",
      length: 25,
      formatter: _atos,
    })
    .int64("sequence_number", { formatter: toNumber })
    .int64("exchange_timestamp", { formatter: toNumber })
    .int32("last_traded_price", { formatter: toNumber });
  return ltpParser.parse(buffer);
}

export async function LTP1(buf: any) {
  const arrayBuffer1 = await buf.arrayBuffer();
  const dataView = new DataView(new Uint8Array(arrayBuffer1, 42, 8).buffer);
  const int8Value = dataView.getInt32(0, true);
  return int8Value;
}

function toNumber(number: any) {
  return number.toString();
}

function _atos(array: any) {
  var newarray = [];
  try {
    for (var i = 0; i < array.length; i++) {
      newarray.push(String.fromCharCode(array[i]));
    }
  } catch (e) {
    throw new Error(e as string);
  }

  let token = JSON.stringify(newarray.join(""));
  return token.replace(/\\u0000/g, "");
}
