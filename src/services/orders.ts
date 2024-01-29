import get_order_body from "../util/reqBodyUtil";
import {
  get_profile,
  get_ltp_data,
  get_orderbook,
  get_tradebook,
  place_order,
  modify_order,
  get_holdings,
  cancel_order,
  get_positions,
} from "../services/requests";

export async function placeOrder(
  token_obj: any,
  oaction: string,
  quantity: number
) {
  const order_body = get_order_body("test", token_obj, oaction, quantity);
  console.log(order_body);
  try {
    let response = await place_order(order_body);
    console.log(response);
  } catch (ex) {
    console.log(ex);
  }
}

export async function getPosition() {
  try {
    let response: any = await get_positions();
    // if (response.message === "SUCCESS") {
    //   console.log(response.data);
    // }
    // response.data
    return response.data;
  } catch (ex) {
    console.log("error while getting positions", ex);
  }
}
