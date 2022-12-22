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
    request (query, object) {
        let answer
        if(object) {
            this.connection.query(query, [object], (err, results, fields) => {
                if (err) throw err
                answer = results
            })
            return answer
        }
        this.connection.query(query, (err, results, fields) => {
            if (err) throw err
            answer = results
        })
        return answer
    }
    endConnection(){
        this.connection.end()
    }
}

export const database= new Database();

