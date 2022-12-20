class Database {
    mysql
    connection
    constructor() {
        this.mysql = require('mysql2');
        this.connection = this.mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'tirocinio_2022_2023',
        });
    }
    //METODO PER COMUNICARE CON IL DATABASE SENZA SPECIFICA
    //IN QUERY SPECIFICARE LA PARTICOLARE RICHIESTA
    request (query) {
        let answer
        let error
        this.connection.query(query, (err, results, fields) => {
            answer = results
            error = err
        })
        if(answer) return answer
        return error
    }
}

export const database= new Database();

