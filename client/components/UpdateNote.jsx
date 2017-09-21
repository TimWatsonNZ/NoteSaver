//  UpdateNote.jsx
let React = require("react");
let ReactDOM = require("react-dom");
let NoteService = require("../services/NoteService.js");
let Note = require("../../models/Note.js");
let EditableNote = require("./EditableNote.jsx");

module.exports = class UpdateNote extends React.Component{
    constructor(props){
        super(props);
        this.state = { id: this.getParameterByName("noteId"), title: "", text: "", tags: [], message: ""};

        this.noteService = new NoteService();

        this.saveNote = this.saveNote.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
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

            <EditableNote title={this.state.title} text={this.state.text} tags={this.state.tags}
                          handleTitleChange={this.handleTitleChange}
                          handleTextChange={this.handleTextChange}
                          handleTagChange={this.handleTagChange} />

            <button className="btn btn-primary pull-right" onClick={this.saveNote}>Save</button>
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