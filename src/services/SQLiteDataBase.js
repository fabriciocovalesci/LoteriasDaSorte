import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("loteriasDataBase.db")

export default db