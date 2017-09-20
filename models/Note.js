//  Note.js

module.exports = class Note{
    constructor(title, text, tags){
        this.title = title;
        this.text = text;
        this.tags = tags;
        this.dateCreated = new Date();
        this.dateModified = new Date();
    }

    setId(id){
        this._id = id;
    }
}