import {database} from "../services/Database.js"

const datetimeToString = datetime => {
    return datetime.toISOString().substring(0, 10) + ' ' + datetime.toLocaleTimeString()
}

class LoggedSession {
    ip_address
    user_username
    access_date
    constructor(ip,username,date){
        this.ip_address = ip
        this.user_username = username
        this.access_date = date
    }
    get username(){return this.user_username}
    set username(username) {this.user_username = username}
    get ipAddress(){return this.ip_address}
    set ipAddress(ip) {this.ip_address = ip}
    get accessDate() {return this.access_date}
    set accessDate(date) {this.access_date = date}

    async getByIp(ip) {
        let result

        //se la query ha un risultato ritorno un nuovo oggetto con i campi del risultato altrimenti ritorno null
        try {
            result = await database.request('SELECT * FROM logged_session WHERE ip_address = ?', ip)
            //console.log(result)
            if(result.length) return new LoggedSession(result[0].ip_address, result[0].user_username, datetimeToString(result[0].access_date))
            else return null
        } catch(e) {
            console.error(e)
        }
    }

    async getByUsername(username) {
        let result

        //se la query ha un risultato ritorno un nuovo oggetto con i campi del risultato altrimenti ritorno null
        try {
            result = await database.request('SELECT * FROM logged_session WHERE user_username = ?', username)
            //console.log(result)
            if(result.length) return new LoggedSession(result[0].ip_address, result[0].user_username, datetimeToString(result[0].access_date))
            else return null
        } catch(e) {
            console.error(e)
        }
    }

    async save(){
        let result
        try {
            result = await database.request('INSERT INTO logged_session SET ?', this)
            //console.log(result)
        } catch(e) {console.error(e)}
        return result
    }

    async delete() {
        let result
        try {
            result = await database.request('DELETE FROM logged_session WHERE ip_address = ?', this.ip_address)
            //console.log(result)
        } catch (e) {
            console.error(e)
        }
        return result
    }

    async deleteByUsername(username){
        let result
        try {
            result = await database.request('DELETE FROM logged_session WHERE username = ?', username)
            //console.log(result)
        } catch(e) {
            console.error(e)
        }
        return result
    }

    async deleteByIp(ip){
        let result
        try {
            result = await database.request('DELETE FROM logged_session WHERE ip_address = ?', ip)
            //console.log(result)
        } catch(e) {
            console.error(e)
        }
        return result
    }

    async updateIp(newIp, oldIp){
        let result
        try {
            result = await database.request('UPDATE logged_session SET ip_address = ? WHERE ip_address = ?', newIp, oldIp)
            //console.log(result)
        }
        catch (e) {
            console.error(e)
        }
        return result
    }

    /*
    //da modificare
    async update(loggedSession){
        let result
        try {
            result = await database.request('UPDATE logged_session SET ? WHERE ip_address = ?', loggedSession, this.ip_address)
            console.log(result)
        }
        catch (e) {
            console.error(e)
        }
        return result
    } */
}

export {LoggedSession}