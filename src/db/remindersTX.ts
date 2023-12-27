import { db } from "./db"
export const createReminderTable = () => {
    db.transaction((tx) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS reminders(id INTEGER PRIMARY KEY AUTOINCREMENT ,name STRING,timestamp NUMBER)`,
            [],
            () => console.log(`table create : success`),
            (error) => console.log("table create: error", error)
        )
    }
    )
}

export const dropReminderTable = () => {
    db.transaction((tx) => {
        tx.executeSql(`DROP TABLE IF EXISTS reminders`,
            [],
            () => console.log(`table delete : success`),
            (error) => console.log("table create: error", error)
        )
    }
    )
}

export const getDataFromReminder = (callback: (data: any[]) => void) => {
    var data: any[] = []
    db.transaction(tx => tx.executeSql(
        `SELECT * FROM reminders`,
        [],
        (tx, result) => {
            const length = result.rows.length;
            const tempData: any = []
            for (var i = 0; i < length; i++) {
                tempData.push(result.rows.item(i))
            }
            data = tempData
            callback(data)
        },
        (error) => console.log(error)
    ))
    return data;
}

export const setDataInReminder = (name: string, timestamp: number) => {
    db.transaction((tx) => {
        tx.executeSql(
            `INSERT INTO reminders (name, timestamp) VALUES (?,?)`,
            [name, timestamp],
            () => console.log("data added successfully"),
            (err) => console.log(err)
        )
    })
}

export const deleteRecord = ( id: number) => {
    db.transaction((tx => {
        tx.executeSql(
            `DELETE FROM reminders WHERE id = ? `,
            [id],
            () => console.log("success deleting record"),
            (err) => console.log("error ===> ", err)
        )
    }))
}

