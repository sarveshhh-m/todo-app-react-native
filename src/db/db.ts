import SQLite from 'react-native-sqlite-storage'

export const db = SQLite.openDatabase({ name: "tasks" },
    () => console.log("success"),
    (err) => console.log(err)
)


