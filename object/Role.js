import {database} from './Database';

class Role {

    constructor(name, description, label) {
        this._name = name;
        this._description = description;
        this._label = label;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    async findByName(name) {
        let result = await database.request('SELECT * FROM `role` WHERE `name` = name');
        console.log(result);
    }

    async findAll(name) {
        let result = await database.request("SELECT * FROM role ");
        console.log(result);
    }
    async save() {
        let result = await database.request('INSERT INTO role SET ? ', this);
        console.log(result);
    }
    async deleteByName(name) {
        let result = await database.request('DELETE FROM role WHERE `name`=name ', this);
        console.log(result);
    }
    /*aggiungere proprieta cascade*/
    async update(role) {
        let result = await database.request('UPDATE role SET ? WHERE `name`=this.name ', role);
        console.log(result);
    }
}

