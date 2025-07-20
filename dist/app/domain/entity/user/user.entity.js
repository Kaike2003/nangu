"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(props) {
        this.props = props;
    }
    static create({ name, phone, password }, validator) {
        const props = { name, phone, password };
        validator.validate(props);
        return new User({ id: "", name, phone, password });
    }
    static with(props) {
        return new User(props);
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get phone() {
        return this.props.phone;
    }
    get password() {
        return this.props.password;
    }
}
exports.User = User;
