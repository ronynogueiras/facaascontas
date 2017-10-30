import Dexie from 'dexie';

const db = new Dexie('FACDB');

db.version(1).stores({
  expenses: '++id, description, paid, due_date, parcels, value',
});

db.open();

export default db;
