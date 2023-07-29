import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const notesDb = await openDB('notes', 1);
  const tx = notesDb.transaction('notes', 'readwrite');
  const store = tx.objectStore('notes');
  const request = store.put({ id: id, note: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

export const getDb = async () => {
  console.log('GET all from the database');
  const notesDb = await openDB('notes', 1);
  const tx = notesDb.transaction('notes', 'readonly');
  const store = tx.objectStore('notes');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};
initdb();
