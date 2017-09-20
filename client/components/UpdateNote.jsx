//  UpdateNote.jsx
let React = require("react");
let ReactDOM = require("react-dom");
let NoteService = require("../services/NoteService.js");
let Note = require("../../models/Note.js");

module.exports = class UpdateNote extends React.Component{
    constructor(props){
        super(props);
        this.state = { id: this.getParameterByName("noteId"), title: "", text: "", tags: [], message: ""};

        this.noteService = new NoteService();

        this.saveNote = this.saveNote.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    
    handleTextChange(event){
        this.setState({ text: event.target.value});
    }

    componentWillMount(){
        this.noteService.getNote(this.state.id)
            .then( (result) => {
                let note = result.data.note;
                this.setState({ title: note.title, text: note.text, tags: note.tags});
            })
            .catch( (err) => {
                console.log(err);
            });   
    }
    
    saveNote(){
        if(!this.state.title || !this.state.text) return;   //  Add validation errors.

        let note = new Note(this.state.title, this.state.text, this.state.tags);
        if(this.state.id){
            note.setId(this.state.id);
        }

        this.noteService.saveNote(
            note
        ).catch( (err) => {
            this.setState({ message: res.message});
        });
    }

    render(){
        return(
        <div>
            <label >{ this.state.message}</label>

            <label htmlFor="Title">Title</label>
            <input name="Title" type="text" 
                    value={this.state.title}/>
            <label htmlFor="NoteText">Note</label>
            <textarea name="NoteText" id="" 
                        cols="30" rows="10" 
                        value={this.state.text} onChange={ this.handleTextChange }></textarea>

            <label htmlFor="Tags"></label>
            <textarea name="Tags" id="" cols="30" rows="1"></textarea>
            <button onClick={this.saveNote}>Save</button>
        </div>
        )
    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}