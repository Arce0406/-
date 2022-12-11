/**
 * https://javascript.info/indexeddb
 */

/**
 * name – a string, the database name.
 * version – a positive integer version, by default 1.
 */
let openRequest = indexedDB.open("ddtool", 1);

/**
 * success: database is ready, there’s the “database object” in openRequest.result, we should use it for further calls.
 * error: opening failed.
 * upgradeneeded: database is ready, but its version is outdated (see below).
 */
openRequest.onupgradeneeded = function (event) {
  // the existing database version is less than 2 (or it doesn't exist)
  let db = openRequest.result;
  switch (
    event.oldVersion // existing db version
  ) {
    case 0:
    // version 0 means that the client had no database
    // perform initialization
    case 1:
    // client had version 1
    // update
  }
};

openRequest.onerror = function () {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function () {
  let db = openRequest.result;
  // continue working with database using db object
  db.onversionchange = function () {
    db.close();
    alert("Database is outdated, please reload the page.");
  };
  // ...the db is ready, use it...
};

openRequest.onblocked = function () {
  // this event shouldn't trigger if we handle onversionchange correctly
  // it means that there's another open connection to the same database
  // and it wasn't closed after db.onversionchange triggered for it
};
