//  EditableNote.jsx

let React = require("react");
let ReactDOM = require("react-dom");
let NoteService = require("../services/NoteService.js");
let Note = require("../../models/Note.js");

module.exports = class EditableNote extends React.Component{
    constructor(props){
        super(props);
        this.state = { id: props.id, title: props.title, text: props.text, tags: props.tags};

        this.noteService = new NoteService();
    }
    
    render(){
        return (
            <div className="col-md-5">
                <div className="form-area">
                    <div className="form-group">
                        <input name="Title" type="text" className="form-control" placeholder="Title"
                            value={this.props.title} onChange={ this.props.handleTitleChange }/>
                    </div>

                    <div className="form-group">
                        <textarea name="NoteText" id="" placeholder="Text" className="form-control"
                                cols="30" rows="10" 
                                value={this.props.text} onChange={ this.props.handleTextChange }></textarea>
                    </div>
                    <div className="form-group">
                        <textarea name="Tags" className="form-control" cols="30" rows="1" placeholder="Tags"></textarea>
                    </div>
                </div>
            </div>
        );
    }
}