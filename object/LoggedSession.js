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
        let result
        try {
            result = await database.request('SELECT * FROM `logged_session` WHERE `ip_address` = ip')
        } catch(e) {
            console.error(e)
        }
        console.log(result)
        return result
    }
    async getByUsername(username) {
        let result
        try {
            result = database.request('SELECT * FROM `logged_session` WHERE `user_username` = username')
        } catch(e) {
            console.error(e)
        }
        console.log(result)
        return result
    }
    async save(){
        let result
        try {
            result = await database.request('INSERT INTO logged_session SET ?', this)
        } catch(e) {console.error(e)}
        console.log(result)
        return result
    }
    async delete() {
        let result
        try {
            result = await database.request('DELETE FROM `logged_session` WHERE `ip_address` = this.ip_address')
        } catch (e) {
            console.error(e)
        }
        console.log(result)
        return result
    }
    async deleteByUsername(username){
        let result
        try {
            result = await database.request('DELETE FROM `logged_session` WHERE `username` = username')
        } catch(e) {
            console.error(e)
        }
        console.log(result)
        return result
    }
    async deleteByIp(ip){
        let result = await database.request('DELETE FROM `logged_session` WHERE `ip_address` = ip')
        console.log(result)
    }
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