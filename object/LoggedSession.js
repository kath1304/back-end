class LoggedSession {
    ipAddress
    username
    accessDate
    constructor(ip,username,date){
        this.ipAddress = ip
        this.username = username
        this.accessDate = date
    }
    get username(){return this.username}
    set username(username) {this.username = username}
    get ipAddress(){return this.ipAddress}
    set ipAddress(ip) {this.ipAddress = ip}
    get accessDate() {return this.accessDate}
    set accessDate(date) {this.accessDate = date}
}

export {LoggedSession}