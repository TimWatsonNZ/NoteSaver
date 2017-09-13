let React = require("react");
let ReactDOM = require("react-dom");
let NoteService = require("../services/NoteService.js");
let Note = require("../../models/Note.js");

module.exports = class AddNote extends React.Component{
    constructor(props){
        super(props);

        this.state = { title: "", text: "", tags: []};
        this.noteService = new NoteService();

        this.saveNote = this.saveNote.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    saveNote(){
        if(!this.state.title || !this.state.text) return;   //  Add validation errors.
        this.noteService.saveNote(new Note(this.state.title, this.state.text, this.state.tags));
    }

    handleTitleChange(event){
        this.setState({ title: event.target.value });
    }

    handleTextChange(event){
        this.setState({ text: event.target.value});
    }

    handleTagChange(event){
        let tagText = event.target.value;

        tagText = tagText.replace(/\s*/, ",");
        tagText = tagText.replace(/,+/, ",");

        this.setState({ tags: tagText.split(",")});
    }

    render(){
        return(
            <div>
                <label htmlFor="Title">Title</label>
                <input name="Title" type="text" 
                       value={this.state.title} onChange={ this.handleTitleChange }/>
                <label htmlFor="NoteText">Note</label>
                <textarea name="NoteText" id="" 
                          cols="30" rows="10" 
                          value={this.state.text} onChange={ this.handleTextChange }></textarea>

                <label htmlFor="Tags"></label>
                <textarea name="Tags" id="" cols="30" rows="1"></textarea>
                <button onClick={this.saveNote}>Save</button>
            </div>
        );
    }
}