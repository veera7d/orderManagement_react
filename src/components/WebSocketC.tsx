//react web socket wss://smartapisocket.angelone.in/smart-stream

import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { build_websoc_ltpreq, LTP } from "../util/websoc_util";

const WebSocketC = ({ data }: any) => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "wss://smartapisocket.angelone.in/smart-stream?clientCode=" +
      import.meta.env.VITE_CLIENT_CODE +
      "&feedToken=" +
      import.meta.env.VITE_FEED_TOKEN +
      "&apiKey=" +
      import.meta.env.VITE_API_KEY
  );

  useEffect(() => {
    if (lastMessage === null) return;
    //console.log("lastMessage", get_subscription_mode(lastMessage.data));
    if(lastMessage.data === "pong"){
        console.log("pong");
        return;
    } 
    get_ltp(lastMessage.data)
  }, [lastMessage]);
  useEffect(() => {
    sendMessage(JSON.stringify(build_websoc_ltpreq(data.token_obj)));
    setTimeout(() => {
      sendMessage(JSON.stringify(build_websoc_ltpreq(data.token_obj, false)));
    }, 30 * 1000);
  }, []);
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      const intervalId = setInterval(() => {
        sendMessage("ping");
        console.log("ping");
      }, 29 * 1000);
      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [readyState, sendMessage]);

  async function get_ltp(message: any) {
    if (message === null) return null;
    const subscription_mode = await get_subscription_mode(message)
    // console.log("ltp", LTP(message).last_traded_price);
    if (subscription_mode === 1) {
      //this.update_ltp(file_data, LTP(lastMessage));
      let ltp = await LTP(message)
      console.log("ltp", ltp.last_traded_price/100);
      return ltp.last_traded_price/100;
    }
  }

  async function get_subscription_mode(message: any) {
    const arrayBuffer1 = await message.arrayBuffer();
    const dataView = new DataView(arrayBuffer1);
    const int8Value = dataView.getInt8(0);
    //console.log(int8Value);
    return int8Value;
  }

  return (
    <>
      <div>
        <p>Connection status: {readyState}</p>
        {}
      </div>
    </>
  );
};

export default WebSocketC;
