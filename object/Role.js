import {database} from "../services/Database.js"

class Role {
    name
    description
    label
    constructor(name, description, label) {
        this.name = name;
        this.description = description;
        this.label = label;
    }

    get name() { return this.name;}
    set name(value) { this.name = value;}
    get description() { return this.description;}
    set description(value) { this.description = value;}
    get label() { return this.label;}
    set label(value) { this.label = value;}

    async getByName(name) {
        let result;
        try {
            result = await database.request('SELECT * FROM `role` WHERE `name` = ?', name);

        } catch (e) {
            console.error(e);
        }
        console.log(result)
        return result
    }

    async getAll() {
        let result;
        try {
            result = await database.request("SELECT * FROM role ");
        } catch (e) {
            console.error(e);
        }
        console.log(result)
        return result
    }

    async save() {
        let result;
        try {
            result = await database.request('INSERT INTO role SET ?', this);
            console.log(result)
            console.log("salvato");
        } catch (e) {
            console.error(e);
        }
        return result
    }

    async deleteByName(name) {
        let result;
        try {
            result = await database.request('DELETE FROM role WHERE `name`=? ', name);
            console.log(result)
        } catch (e) {
            console.error(e);
        }

        return result
    }

    /*aggiungere proprieta cascade*/
    async update(role) {
        let result;
        try {
            result = await database.request('UPDATE `role` SET ? WHERE `name` = this.name', role);
        } catch (e) {
            console.error(e);
        }
        console.log(result)
        return result
    }


}
export {Role}
