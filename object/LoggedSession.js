import {database} from "../services/Database.js"

//funzione per trasformare datetime ritornato dalla query nella stringa di partenza
const datetimeToString = datetime => {
    return datetime.toISOString().substring(0, 10) + ' ' + datetime.toLocaleTimeString()
}

export class LoggedSession {
    ip_address

    user_username

    access_date

    constructor(ip, username, date) {
        this.ip_address = ip
        this.user_username = username
        this.access_date = date
    }

    get username() {
        return this.user_username
    }

    set username(username) {
        this.user_username = username
    }

    get ipAddress() {
        return this.ip_address
    }

    set ipAddress(ip) {
        this.ip_address = ip
    }

    get accessDate() {
        return this.access_date
    }

    set accessDate(date) {
        this.access_date = date
    }


    static async getByIp(ip) {
        let result
        let newLoggedSession
        result = await database.request('SELECT * FROM logged_session WHERE ip_address = ?', ip)
        if(result.length)
            newLoggedSession = new LoggedSession(result[0].ip_address, result[0].user_username, result[0].access_date)
        else
            return null;
        return newLoggedSession;
    }

    static async getByUsername(username) {
        let result
        //se la query ha un risultato ritorno un nuovo oggetto con i campi del risultato altrimenti ritorno null
        result = await database.request('SELECT * FROM logged_session WHERE user_username = ?', username)
        if (result.length) return new LoggedSession(result[0].ip_address, result[0].user_username, datetimeToString(result[0].access_date))
        else return null
    }

    static async getAll() {
        let arrayResult = []
        let result
        result = await database.request('SELECT * FROM logged_session')
        for (let i = 0; i < result.length; i++) {
            arrayResult.push(new LoggedSession(result[i].ip_address, result[i].user_username, datetimeToString(result[i].access_date)))
        }
        return arrayResult
    }

    async save() {
        let result
        result = await database.request('INSERT INTO logged_session SET ?', this)
        return result
    }

    static async deleteByIp(ip) {
        let result
        result = await database.request('DELETE FROM logged_session WHERE ip_address = ?', ip)
        return result
    }

    static async deleteByUsername(username) {
        let result
        result = await database.request('DELETE FROM logged_session WHERE user_username = ?', username)
        return result
    }

    static async deleteAll() {
        let result
        result = await database.request('DELETE FROM logged_session');
        return result
    }

    async updateByIp(oldIp) {
        let result
        result = await database.request('UPDATE `logged_session` SET ? WHERE `ip_address` = ?', this, oldIp);
        return result
    }

    async updateIp(newIp, oldIp) {
        let result

        try {
            result = await database.request('UPDATE `logged_session` SET ip_address = ? WHERE ip_address = ?', newIp, oldIp)
        } catch (e) {
            console.error(e)
        }

        return result
    }


}

