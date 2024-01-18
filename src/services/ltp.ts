//getting the last traded price of a stock and retuir  the float value POST	Get LTP Data	https://apiconnect.angelbroking.com/rest/secure/angelbroking/order/v1/getLtpData	To retrieve LTP data
//http://localhost.com/?auth_token=eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IkQ1Mzg1OTkiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwidG9rZW4iOiJleUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUpFTlRNNE5UazVJaXdpWlhod0lqb3hOekEwTnpRME1qZ3lMQ0pwWVhRaU9qRTNNRFEyTlRRMU5qQXNJbXAwYVNJNklqTTNPRFJqWlRZNExUVm1ZVGt0TkRKaE55MDRNVFU1TFRjeFpURmpZVGN3WmpsbFpTSXNJbTl0Ym1WdFlXNWhaMlZ5YVdRaU9qZ3NJbk52ZFhKalpXbGtJam9pTXlJc0luVnpaWEpmZEhsd1pTSTZJbU5zYVdWdWRDSXNJblJ2YTJWdVgzUjVjR1VpT2lKMGNtRmtaVjloWTJObGMzTmZkRzlyWlc0aUxDSm5iVjlwWkNJNk9Dd2ljMjkxY21ObElqb2lNeUlzSW1SbGRtbGpaVjlwWkNJNklqZzBPV1U0TUdGaExXWm1PRE10TTJJMU1pMDRaVGhsTFRjNFpEWTNaV1kwT0dNd01pSjkuZ1pzNGUtT2ZYYXlWb2dFWnNLbTJNWnZTUE54blMwWk45VXB0Q2dPeFo2VnZDX0hFZWNYRDN0bWhmeEQyWlVRZmpKZm03QXQtd3d1bzhmMEs3TTBKaXciLCJBUEktS0VZIjoiVElsdWUycFEiLCJpYXQiOjE3MDQ2NTQ2MjAsImV4cCI6MTcwNDc0NDI4Mn0.chDHvBWDObdWIkg_MpYjT-RGTlkVLox8JfliU9xdvw_wbkm8Tckpfdc7RI5uHqWWnbw0uALA8LkMbnwHJJaKJw&feed_token=eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IkQ1Mzg1OTkiLCJpYXQiOjE3MDQ2NTQ2MjAsImV4cCI6MTcwNDc0MTAyMH0.PtLQeEUP8Dme98WnBNDzsCsulNE_FG0D0StInx_FwyDl30KAn2WY-Hram_aX_baqqxf4DJVkF6RN_9H_NDB2AA&refresh_token=eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbiI6IlJFRlJFU0gtVE9LRU4iLCJSRUZSRVNILVRPS0VOIjoiZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKRU5UTTROVGs1SWl3aVpYaHdJam94TnpBME56UXhNREl3TENKcFlYUWlPakUzTURRMk5UUTFOakFzSW1wMGFTSTZJbUUwTnpWa01EVTRMVE15T0RndE5ETmxZeTA0TnpFd0xURXdNalZpWlRoaVpHTXlPU0lzSW05dGJtVnRZVzVoWjJWeWFXUWlPakFzSW5SdmEyVnVJam9pVWtWR1VrVlRTQzFVVDB0RlRpSXNJblZ6WlhKZmRIbHdaU0k2SW1Oc2FXVnVkQ0lzSW5SdmEyVnVYM1I1Y0dVaU9pSjBjbUZrWlY5eVpXWnlaWE5vWDNSdmEyVnVJaXdpWkdWMmFXTmxYMmxrSWpvaU9EUTVaVGd3WVdFdFptWTRNeTB6WWpVeUxUaGxPR1V0Tnpoa05qZGxaalE0WXpBeUluMC5rUE1jS3QyTTdBN3J3ZGpEb3owOERsOUZ3ejBaM3N2c2tGZkVJYlhUNUtfQ1BKZVhxX0Rlc2JsZGhjWTVhN1F2VDlNNEU3S0lCeUN6ZkRLLS13MTZOdyIsImlhdCI6MTcwNDY1NDYyMH0.J1CtsUX-3ZBbHcuocdvyJoMAuebS_NvG-EcPcJ3GtrdI2XVQ-ow3-OSzTSrb-j3-1NG8Bn8NaRzIihINr1p3LQ
const env = import.meta.env as any;
// import { Websocket_LTP } from "../websockets/websoc";

class LtpService {
  public async getLtp(token_obj: any) {
    try {
      // console.log("profile", smart_api.smart_api.getProfile());
    //   const w_ltp = new Websocket_LTP();
      const response = await fetch(
        "https://apiconnect.angelbroking.com/rest/secure/angelbroking/order/v1/getLtpData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-ClientLocalIP": "192.168.168.168",
            "X-ClientPublicIP": "106.193.147.98",
            "X-MACAddress": "fe80::216e:6507:4b90:3719",
            Accept: "application/json",
            "X-PrivateKey": env.VITE_API_KEY || "",
            "X-UserType": "USER",
            "X-SourceID": "WEB",
            Authorization: "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
          },
          body: JSON.stringify({
            exchange: token_obj.exch_seg,
            symboltoken: token_obj.token,
            tradingsymbol: token_obj.symbol,
          }),
        }
      );
      const data = await response.json();
      //console.log(data);
      const ltp = data.data.ltp;
      //console.log(ltp, import.meta.env.VITE_API_KEY);
      return parseFloat(ltp);
    } catch (error) {
      console.log(error);
    }
  }
  public async getOptionLtp(token_obj: any) {}
}

export default LtpService;
