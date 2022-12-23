import mysql from "mysql2/promise";

class Database {
    mysql
    connection

    constructor() {
        this.mysql = mysql;
    }

    async init() {
        this.connection = await this.mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'tirocinio_2022_2023',
            database: 'tirociniodevel'
        });
    }

    //METODO PER COMUNICARE CON IL DATABASE SENZA SPECIFICA
    //IN QUERY SPECIFICARE LA PARTICOLARE RICHIESTA
    async request(query, ...objects) {
        let result
        if ([...objects].length) {
            [result] = await this.connection.query(query, [...objects])
        }
        else {
            [result] = await this.connection.query(query)

        }

        return result
    }

    endConnection() {
        this.connection.end()
    }
}

export const database = new Database();

