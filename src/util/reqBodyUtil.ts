

const get_order_body = (token:string,token_obj:any,oaction:String,quantity:number,ordertype=null,price=null,triggerprice=null)=>{
    return {
        "variety": "NORMAL",
        "tradingsymbol": token_obj.symbol,
        "symboltoken": token_obj.token,
        "transactiontype": oaction,
        "exchange": token_obj.exch_seg,
        //"ordertype": ordertype === constants.order_types.LIMIT ? ordertype : constants.order_types.MARKET,
        "ordertype":"MARKET",
        //"triggerprice":triggerprice,
        "producttype": "INTRADAY",
        "duration": "DAY",
        "price":  "0" ,
        "squareoff": "0",
        "stoploss": "0",
        "quantity": quantity.toString(),
        "ordertag":token
    }
}

export default get_order_body;