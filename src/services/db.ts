import React, { useEffect, useState } from "react";

interface MyObject {
  id?: number;
  name: string;
  age: number;
}

const useIndexedDB = (dbName: string, storeName: string) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    const initializeDB = async () => {
      const request = indexedDB.open(dbName, 1);

      request.onerror = (event) => {
        console.error(
          "Error opening IndexedDB:",
          (event.target as IDBOpenDBRequest).error
        );
      };

      request.onsuccess = (event) => {
        const database = (event.target as IDBRequest<IDBDatabase>).result;
        setDb(database);
      };

      request.onupgradeneeded = (event) => {
        const database = (event.target as IDBRequest<IDBDatabase>).result;
        if (!database.objectStoreNames.contains(storeName)) {
          database.createObjectStore(storeName, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };
    };

    initializeDB();
  }, [dbName, storeName]);

  const addObject = async (object: MyObject) => {
    if (!db) return;

    return new Promise<number>((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);

      const request = objectStore.add(object);

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = (event: Event) => {
        console.error(
          "Error adding object to IndexedDB:",
          (event.target as IDBRequest<IDBValidKey>).error
        );
        reject((event.target as IDBRequest<IDBValidKey>).error);
      };
    });
  };

  const getAllObjects = async () => {
    if (!db) return [];

    return new Promise<MyObject[]>((resolve, reject) => {
      const transaction = db.transaction([storeName], "readonly");
      const objectStore = transaction.objectStore(storeName);

      const request = objectStore.getAll();

      request.onsuccess = (event: Event) => {
        resolve(request.result as MyObject[]);
      };

      request.onerror = (event: Event) => {
        console.error(
          "Error fetching objects from IndexedDB:",
          (event.target as IDBRequest).error
        );
        reject((event.target as IDBRequest).error);
      };
    });
  };

  //get objects by name and expiry
  const getObjects = async (name: string, expiry: string) => {
    if (!db) return [];

    return new Promise<MyObject[]>((resolve, reject) => {
      const transaction = db.transaction([storeName], "readonly");
      const objectStore = transaction.objectStore(storeName);

      const request = objectStore.getAll();

      request.onsuccess = (event: Event) => {
        // let out = request.result.
        resolve(request.result as MyObject[]);
      };

      request.onerror = (event: Event) => {
        console.error(
          "Error fetching objects from IndexedDB:",
          (event.target as IDBRequest).error
        );
        reject((event.target as IDBRequest).error);
      };
    });
  };

  //get unique expirys with name
  const getUniqueExpirys = async (name: string) => {
    if (!db) return [];

    return new Promise<MyObject[]>((resolve, reject) => {
      const transaction = db.transaction([storeName], "readonly");
      const objectStore = transaction.objectStore(storeName);

      const request = objectStore.getAll();

      request.onsuccess = (event: Event) => {
        resolve(request.result as MyObject[]);
      };

      request.onerror = (event: Event) => {
        console.error(
          "Error fetching objects from IndexedDB:",
          (event.target as IDBRequest).error
        );
        reject((event.target as IDBRequest).error);
      };
    });
  };

  return { addObject, getAllObjects, getObjects };
};

// Example usage in a React component
const MyComponent: React.FC = () => {
  const { addObject, getAllObjects } = useIndexedDB("myDB", "myStore");

  useEffect(() => {
    // Example: Add an object to IndexedDB
    addObject({ name: "John", age: 30 }).then((id) =>
      console.log("Object added with ID:", id)
    );

    // Example: Get all objects from IndexedDB
    getAllObjects().then((objects) =>
      console.log("All objects from IndexedDB:", objects)
    );
  }, [addObject, getAllObjects]);

  return (
    <>
      <div>{/* Your component JSX */}</div>
    </>
  );
};

export default MyComponent;
