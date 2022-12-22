import mysql from "mysql2";

class Database {
    mysql
    connection

    constructor() {
        this.mysql = mysql;
        this.connection = this.mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'tirocinio_2022_2023',
            database: 'tirociniodevel'
        });
    }

    //METODO PER COMUNICARE CON IL DATABASE SENZA SPECIFICA
    //IN QUERY SPECIFICARE LA PARTICOLARE RICHIESTA
    request(query, object) {
        let answer
        if (object) {
            return new Promise((resolve, reject) => {
                this.connection.query(query, [object], (err, result, fields) => {
                    if (err) reject(err)
                    resolve(result)
                })
            });
        }
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, result, fields) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    endConnection() {
        this.connection.end()
    }
}

export const database = new Database();

