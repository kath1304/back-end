export class Database {
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
    query = (query) => {
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
//export default new Database();
