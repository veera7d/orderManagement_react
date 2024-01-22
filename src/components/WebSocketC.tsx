//react web socket wss://smartapisocket.angelone.in/smart-stream

import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  build_websoc_ltpAllReq,
  build_websoc_ltpreq,
  get_ltp,
} from "../util/websoc_util";

const WebSocketC = (oc_ltp: any, setOc_ltp: any) => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "wss://smartapisocket.angelone.in/smart-stream?clientCode=" +
      import.meta.env.VITE_CLIENT_CODE +
      "&feedToken=" +
      import.meta.env.VITE_FEED_TOKEN +
      "&apiKey=" +
      import.meta.env.VITE_API_KEY
  );

  async function subscribe_all(token_obj_list: any) {
    if (token_obj_list === undefined || token_obj_list === null) return;
    await sendMessage(JSON.stringify(build_websoc_ltpAllReq(token_obj_list)));
  }
  async function unSubscribe_all(token_obj_list: any) {
    if (token_obj_list === undefined || token_obj_list === null) return;
    await sendMessage(JSON.stringify(build_websoc_ltpAllReq(token_obj_list)));
  }
  async function subscribe(token_obj: any) {
    if (token_obj === undefined || token_obj === null) return;
    await sendMessage(JSON.stringify(build_websoc_ltpreq(token_obj)));
  }
  async function unsubscribe(token_obj: any) {
    if (token_obj === undefined || token_obj === null) return;
    await sendMessage(JSON.stringify(build_websoc_ltpreq(token_obj, false)));
  }

  async function update_ltp_data(lastMessage: any) {
    let ltpdata = await get_ltp(lastMessage);
    setOc_ltp(
      oc_ltp.map((d: any) => {
        if (ltpdata === null || ltpdata === undefined) return d;
        if (d.token_obj.token === ltpdata[0]) {
          d.ltp = ltpdata[1];
          console.log("ltp", ltpdata[0], ltpdata[1]);
        }
        return d;
      })
    );
  }

  useEffect(() => {
    if (lastMessage === null) return;
    //console.log("lastMessage", get_subscription_mode(lastMessage.data));
    if (lastMessage.data === "pong") {
      console.log("pong");
      return;
    }
    update_ltp_data(lastMessage.data);
  }, [lastMessage]);
  //for test
  //   useEffect(() => {
  //     sendMessage(JSON.stringify(build_websoc_ltpreq(data.token_obj)));
  //     setTimeout(() => {
  //       sendMessage(JSON.stringify(build_websoc_ltpreq(data.token_obj, false)));
  //     }, 30 * 1000);
  //   }, []);
  let intervalId: any = null;
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      intervalId = setInterval(() => {
        sendMessage("ping");
        console.log("ping");
      }, 29 * 1000);
      //return () => clearInterval(intervalId); // Cleanup on unmount
    } else if (readyState === ReadyState.CLOSED) {
      clearInterval(intervalId);
      intervalId = null;
      console.log("closed");
    }
  }, [readyState]);
  return { subscribe, unsubscribe, subscribe_all, unSubscribe_all };
};

export default WebSocketC;
