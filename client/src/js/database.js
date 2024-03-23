import { openDB } from 'idb';

// Initializing the IndexedDB database
const initializeDB = async () =>
  openDB('jate', 1, {
    // Handling database schema changes through upgrade function
    upgrade(db) {
      // Checking if the object store already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('The "jate" database already exists');
        return;
      }
      // Creating a new object store with auto-incrementing key path
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('The "jate" database has been created');
    },
  });

// Adding content to the IndexedDB database
export const putDataToDB = async (content) => {
  console.log("Posting data to the database!");

  // Opening a connection to the IndexedDB database
  const jateDB = await openDB('jate', 1);

  // Initiating a read-write transaction
  const transaction = jateDB.transaction('jate', 'readwrite');

  // Opening the object store
  const store = transaction.objectStore('jate');

  // Adding content to the object store
  const request = store.add({ content });

  // Waiting for the request to complete and logging the result
  const result = await request;
  console.log('Data has been saved to the database', result);
};

// Retrieving all content from the IndexedDB database
export const getDataFromDB = async () => {
  console.log('Fetching data from the database');

  // Opening a connection to the IndexedDB database
  const jateDB = await openDB('jate', 1);

  // Initiating a read-only transaction
  const transaction = jateDB.transaction('jate', 'readonly');

  // Opening the object store
  const store = transaction.objectStore('jate');

  // Retrieving all data from the object store
  const request = store.getAll();

  // Waiting for the request to complete and logging the result
  const result = await request;
  console.log('Data fetched from the database', result);
}; 

// Initializing the database when the module is imported
initializeDB();