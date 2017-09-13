let React = require("react");
let ReactDOM = require("react-dom");
let NoteService = require("../services/NoteService.js");
let Note = require("../../models/Note.js");
let SearchResult = require("./SearchResult.jsx");

module.exports = class SearchNotes extends React.Component{
    constructor(props){
        super(props);
        this.state = { searchTerm: "", searchResults: [] };

        this.noteService = new NoteService();

        this.search = this.search.bind(this);
        this.searchTermChanged = this.searchTermChanged.bind(this);
    }

    search(){
        if(!this.state.searchTerm) return;
               
        const results = this.noteService.search(this.state.searchTerm)
            .then( (res, err) => {
                console.log(res);
                this.setState({ searchResults: res });
            });
    }

    searchTermChanged(event){
        this.setState({ searchTerm:  event.target.value });
    }

    render(){
        console.log(this.state.searchResults.length);
        const searchResults = this.state.searchResults.map( (result) => {
            return (
                <SearchResult key={result._id} 
                              id={result._id} title={result.title} text={result.text}/>
            );
        });

        return (
            <div>
                <label htmlFor="search">Search Term</label>
                <input name="search" type="text" onChange={ this.searchTermChanged }/>
                <button onClick={ this.search }>Search</button>

                <label htmlFor="">Search Results</label>
                <div>
                    {searchResults}
                </div>
            </div>
        );
    }
}
