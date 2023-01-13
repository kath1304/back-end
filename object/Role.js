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

    get name() {
        return this.name;
    }

    set name(value) {
        this.name = value;
    }

    get description() {
        return this.description;
    }

    set description(value) {
        this.description = value;
    }

    get label() {
        return this.label;
    }

    set label(value) {
        this.label = value;
    }

    static async getByName(name) {
        let result;
        let newRole;
        result = await database.request('SELECT * FROM `role` WHERE `name` = ?', name);
        if(result.length)
            newRole = new Role(result[0].name, result[0].description, result[0].label)
        else
            return null;
        return newRole;
    }

    static async getAll() {
        let arrayResult = [];
        let result;
        result = await database.request('SELECT * FROM role ');
        for (let i = 0; i < result.length; i++) {
            arrayResult.push(new Role(result[i].name, result[i].description, result[i].label));
        }
        return arrayResult;
    }

    async save() {
        let result;
        result = await database.request('INSERT INTO role SET ?', this);
        return result
    }

    static async deleteByName(name) {
        let result;
        result = await database.request('DELETE FROM role WHERE `name`=? ', name);
        return result
    }

    static async deleteAll() {
        let result;
        result = await database.request('DELETE FROM role');
        return result
    }

    async updateByName(oldName) {
        let result;
        try {
            result = await database.request('UPDATE `role` SET ? WHERE `name` = ?', this, oldName);
        } catch (e) {
            console.error(e);
        }
        return result
    }
}

