import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("loterias.db")

export default db