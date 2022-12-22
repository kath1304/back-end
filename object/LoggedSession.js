import express from "express"
import {database} from "../services/Database.js"

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
        let result = await database.request('SELECT * FROM `logged_session` WHERE `ip_address` = ip')
        console.log(result)
    }
    async getByUsername(username) {
        let result = database.request('SELECT * FROM `logged_session` WHERE `user_username` = ip')
        console.log(result)
    }
    async save(){
        try {
            let result = await database.request('INSERT INTO logged_session SET ?', this)
            console.log(result)
        } catch(error) {console.log(error)}
    }
    async delete(){
        let result = await database.request('DELETE FROM `logged_session` WHERE `ip_address` = this.ip_address')
        console.log(result)
    }
    async deleteByUsername(username){
        let result = await database.request('DELETE FROM `logged_session` WHERE `username` = username')
        console.log(result)
    }
    async deleteByIp(ip){
        let result = await database.request('DELETE FROM `logged_session` WHERE `ip_address` = ip')
        console.log(result)
    }
    //specificare il cascade all in phpstorm
    async update(loggedSession){
        let result
        try {
            result = await database.request('UPDATE `logged_session` SET ? WHERE `ip_address` = this.ip_address', loggedSession)
        }
        catch (e) {
            console.error(e)
        }
        console.log(result)
        return result
    }
}

export {LoggedSession}