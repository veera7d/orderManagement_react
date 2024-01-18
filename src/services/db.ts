import { openDB, DBSchema } from "idb";

interface MyDB extends DBSchema {
  lists: {
    key: string;
    value: tokenI;
  };
}
interface tokenI {
  token: string;
  symbol: string;
  name: string;
  expiry: string;
  strike: string;
  lotsize: string;
  instrumenttype: string;
  exch_seg: string;
  tick_size: string;
}

//function to add list of objects of kind MyDB to the database
export const addList = async (list: tokenI[]) => {
  const db = await openDB<MyDB>("my-db", 1, {
    upgrade(db) {
      db.createObjectStore("lists");
    },
  });
  if (db === null) {
    return; // or handle the error accordingly
  }
  console.log("listttttt", list);
  const tx = db.transaction("lists", "readwrite");
  list = [
    {
      token: "72233",
      symbol: "BANKNIFTY29FEB2446300PE",
      name: "BANKNIFTY",
      expiry: "29FEB2024",
      strike: "4630000.000000",
      lotsize: "15",
      instrumenttype: "OPTIDX",
      exch_seg: "NFO",
      tick_size: "5.000000",
    },
    {
      token: "46825",
      symbol: "FINNIFTY09JAN2422100CE",
      name: "FINNIFTY",
      expiry: "09JAN2024",
      strike: "2210000.000000",
      lotsize: "40",
      instrumenttype: "OPTIDX",
      exch_seg: "NFO",
      tick_size: "5.000000",
    },
    {
      token: "55781",
      symbol: "BANKNIFTY25JAN2444700CE",
      name: "BANKNIFTY",
      expiry: "25JAN2024",
      strike: "4470000.000000",
      lotsize: "15",
      instrumenttype: "OPTIDX",
      exch_seg: "NFO",
      tick_size: "5.000000",
    },
  ];
  try {
    // await deleteAll();
    await Promise.all(
      list.map((item) => {
        tx.store.add(item, item.symbol);
      })
    );
  } catch (e) {
    console.log("error", e);
  }

  console.log("count", await tx.store.count());
  await tx.done;
};

//function to get object from the database with paramaters
export const getList = async (key: string) => {
  const db = await openDB<MyDB>("my-db", 1);
  if (db === null) {
    return; // or handle the error accordingly
  }
  return await db.get("lists", key);
};

//function to get object from the database with paramaters
export const getAllList = async () => {
  const db = await openDB<MyDB>("my-db", 1);
  if (db === null) {
    return; // or handle the error accordingly
  }
  return await db.getAll("lists");
};

//function to delete all the objects from the database
export const deleteAll = async () => {
  const db = await openDB<MyDB>("my-db", 1);
  if (db === null) {
    return; // or handle the error accordingly
  }
  const tx = db.transaction("lists", "readwrite");
  await tx.store.clear();
  await tx.done;
};

export default { addList, getList, getAllList, deleteAll };
