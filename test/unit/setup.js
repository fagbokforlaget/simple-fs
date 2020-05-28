import Dexie from 'dexie'
import indexedDB from 'fake-indexeddb'

Dexie.dependencies.indexedDB = indexedDB
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange')
