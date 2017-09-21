let React = require("react");
let ReactDOM = require("react-dom");
let NoteService = require("../services/NoteService.js");
let Note = require("../../models/Note.js");
let EditableNote = require("./EditableNote.jsx");

module.exports = class AddNote extends React.Component{
    constructor(props){
        super(props);

        this.state = { id: "", title: "", text: "", tags: [], message: ""};
        this.noteService = new NoteService();

        this.saveNote = this.saveNote.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
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

    saveNote(){
        console.log(this.state.title);
        if(!this.state.title || !this.state.text) return;   //  Add validation errors.

        let note = new Note(this.state.title, this.state.text, this.state.tags);
        if(this.state.id){
            note.setId(this.state.id);
        }

        this.noteService.saveNote(
            note
        ).then( (res, err) => {
            console.log(res);
            if(err){
                this.setState({ message: res.message});
            }else{
                if(res.data.redirect){
                    window.location = res.data.redirect;
                }
            }
        });
    }

    render(){
        return(
            <div className="container">
                <EditableNote title={this.state.title} text={this.state.text} tags={this.state.tags} 
                              handleTitleChange={this.handleTitleChange}
                              handleTextChange={this.handleTextChange}
                              handleTagChange={this.handleTagChange} />
                <button className="btn btn-primar pull-right" onClick={this.saveNote}>Save</button>
            </div>
        );
    }
}