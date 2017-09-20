//  noteService.js

let Note = require("../../models/Note.js");
let axios = require("axios");

module.exports = class NoteService{
    constructor(){

    }

    saveNote(note){
        if(!note || !note.constructor || note.constructor.name != "Note"){
            throw "Invalid input";
        }

        return new Promise( (resolve, reject) => {
            axios.post("api/notes", note)
            .then( (response) => {
               resolve(response);
            })
            .catch( (error) => {
               reject(error);
            });
        });
    }

    search(searchTerm){
        if(!searchTerm){
            throw "Invalid input";
        }

        return axios.get("/api/notes?searchTerm=" + searchTerm)
        .then( (response) => {
            return Promise.resolve(response.data.notes);
        })
        .catch( (error) => {
            return Promise.reject(error);
        });
    }

    getNote(id){
        if(!id) throw "Invalid input";

        return new Promise( (resolve, reject) => {
            axios.get("/api/notes/" + id).then( (response) => {
                resolve(response);
            }).catch( (error) => {
                reject(error);
            });
        });
    }
}