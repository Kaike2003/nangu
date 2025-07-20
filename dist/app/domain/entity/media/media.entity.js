"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
class Media {
    constructor(props) {
        this.props = props;
    }
    static create({ image, video, userId }) {
        return new Media({ id: "", image, video, userId });
    }
    static with(props) {
        return new Media(props);
    }
    get id() {
        return this.props.id;
    }
    get video() {
        return this.props.video;
    }
    get image() {
        return this.props.image;
    }
    get userId() {
        return this.props.userId;
    }
}
exports.Media = Media;
