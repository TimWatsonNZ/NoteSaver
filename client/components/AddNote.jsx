let React = require("react");
let ReactDOM = require("react-dom");
let NoteService = require("../services/NoteService.js");
let Note = require("../../models/Note.js");

module.exports = class AddNote extends React.Component{
    constructor(props){
        super(props);

        this.state = { id: "", title: "", text: "", tags: [], message: ""};
        this.noteService = new NoteService();

        this.saveNote = this.saveNote.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    saveNote(){
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
            <div className="container">
                <div className="col-md-5">
                    <div className="form-area">
                        <label >{ this.state.message}</label>

                        <div className="form-group">
                            <input name="Title" type="text" className="form-control" placeholder="Title"
                                value={this.state.title} onChange={ this.handleTitleChange }/>
                        </div>

                        <div className="form-group">
                            <textarea name="NoteText" id="" placeholder="Text" className="form-control"
                                    cols="30" rows="10" 
                                    value={this.state.text} onChange={ this.handleTextChange }></textarea>
                        </div>
                        <div className="form-group">
                            <textarea name="Tags" className="form-control" cols="30" rows="1" placeholder="Tags"></textarea>
                        </div>
                        <button className="btn btn-primar pull-right" onClick={this.saveNote}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}