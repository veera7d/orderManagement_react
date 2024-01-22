import { useEffect, useState } from "react";
import angel_allscripts from "../data/angelscripts";

const AllScripts = (setN: any, setBN: any) => {
  //   useEffect(() => {
  //     fetch(
  //       "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
  //     )
  //       .then((response) => response.json())
  //       .then(async (newData) => {
  //         console.log(newData);
  //         let nifty: any[] = [];
  //         let banknifty: any[] = [];
  //         newData.array.forEach((_element: any) => {
  //           if (_element.name === "NIFTY" && _element.exch_seg === "NFO") {
  //             nifty.push(_element);
  //           }
  //           if (_element.name === "BANKNIFTY" && _element.exch_seg === "NFO") {
  //             banknifty.push(_element);
  //           }
  //         });
  //         setN(nifty);
  //         setBN(banknifty);
  //       })
  //       .catch((error) => console.error("all script error", error));
  //   }, []);
  function update_allscripts() {
    setN(
      angel_allscripts.filter(
        (s: any) => s.name === "NIFTY" && s.exch_seg === "NFO"
      )
    );
    setBN(
      angel_allscripts.filter(
        (s: any) => s.name === "BANKNIFTY" && s.exch_seg === "NFO"
      )
    );
  }
  return update_allscripts;
};

export default AllScripts;

// {
//     "token": "55786",
//     "symbol": "BANKNIFTY25JAN2444900PE",
//     "name": "BANKNIFTY",
//     "expiry": "25JAN2024",
//     "strike": "4490000.000000",
//     "lotsize": "15",
//     "instrumenttype": "OPTIDX",
//     "exch_seg": "NFO",
//     "tick_size": "5.000000"
// },
