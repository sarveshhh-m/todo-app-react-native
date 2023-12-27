import { db } from "./db"

export const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT ,name STRING,priority INTEGER, description STRING)`,
            [],
            () => console.log(`table create : success`),
            (error) => console.log("table create: error", error)
        )
    }
    )
}

export const dropTable = () => {
    db.transaction((tx) => {
        tx.executeSql(`DROP TABLE IF EXISTS tasks`,
            [],
            () => console.log(`table delete : success`),
            (error) => console.log("table create: error", error)
        )
    }
    )
}

export const getData = (callback: (data: any[]) => void) => {
    var data: any[] = []
    db.transaction(tx => tx.executeSql(
        `SELECT * FROM tasks`,
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

export const setData = (name: string, priority: number, description:string) => {
    db.transaction((tx) => {
        tx.executeSql(
            `INSERT INTO tasks (name, priority,description) VALUES (?,?,?)`,
            [name, priority,description],
            () => console.log("data added successfully"),
            (err) => console.log(err)
        )
    })
}

export const deleteRecord = (id: number) => {
    db.transaction((tx => {
        tx.executeSql(
            `DELETE FROM tasks WHERE id = ? `,
            [id],
            () => console.log("success deleting record"),
            (err) => console.log("error ===> ", err)
        )
    }))
}



export const updateRecord = (id:number, newData:any) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE tasks SET name=?, priority=?, description=? WHERE id=?',
        [newData.name, newData.priority, newData.description, id],
        (_, results) => {
          console.log('Record updated successfully:', results);
        },
        (_, error) => {
          console.error('Error updating record:', error);
        }
      );
    });
  };

