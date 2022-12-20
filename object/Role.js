class Role{
    constructor(name, description, label) {
        this._name= name;
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
}

export {Role};