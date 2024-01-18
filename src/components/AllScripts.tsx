import { useEffect, useState } from "react";
import addData from "../services/db";
import getAllList from "../services/db";
import deleteAllList from "../services/db";

const AllScripts = () => {
  const [hasRunEffect, setHasRunEffect] = useState(false);
  useEffect(() => {
    deleteAllList.deleteAll();
    if (!hasRunEffect) {
        setHasRunEffect(true);
    //   fetch(
    //     "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
    //   )
    //     .then((response) => response.json())
    //     .then(async (newData) => {
    //       console.log(newData);
    //       await addData.addList(newData);
    //       getAllList.getAllList().then((data: any) => {
    //         console.log("data", data);
    //       });
    //     })
    //     .catch((error) => console.error(error));
        
        addData.addList([])
        .then(() => {;
          getAllList.getAllList().then((data: any) => {
            console.log("data", data);
        })});
    }
  }, []);
  return (
    <>
    </>
  );
};

export default AllScripts;
