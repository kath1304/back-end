import {database} from "../services/Database.js"

export class Role {
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
        let newRole;
        try {
            result = await database.request('SELECT * FROM `role` WHERE `name` = ?', name);
            newRole = new Role(result[0].name, result[0].description, result[0].label)
            this.name=result[0].name; this.description=result[0].description; this.label=result[0].label;
            console.log(result);
        } catch (e) {
            console.error(e);
        }
        return this;
    }

    async getAll() {
        let arrayResult= [];
        let result;

        try {
            result = await database.request('SELECT * FROM role ');
            for(let i=0; i<result.length; i++){
                arrayResult.push(new Role(result[i].name, result[i].description, result[i].label));
            }
        } catch (e) {
            console.error(e);
        }
        console.log(result)
        return arrayResult;
    }

    async save() {
        let result;
        try {
            result = await database.request('INSERT INTO role SET ?', this);
            console.log(result)
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

    async deleteAll() {
        let result;
        try {
            result = await database.request('DELETE FROM role');
            console.log(result)
        } catch (e) {
            console.error(e);
        }
        return result
    }

    /*aggiungere proprieta cascade*/
    async updateByName(oldName) {
        let result;
        try {
            result = await database.request('UPDATE `role` SET ? WHERE `name` = ?', this, oldName);
        } catch (e) {
            console.error(e);
        }
        console.log(result)
        return result
    }


}

