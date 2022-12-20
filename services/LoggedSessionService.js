import {LoggedSession} from "../object/LoggedSession.js"
import {Database} from "./Database.js"
import express from "express"

class LoggedSessionService {
    database
    constructor(){
        this.database = new Database()
    }

}

