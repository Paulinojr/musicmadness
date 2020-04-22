import React from 'react';
import '../../Search.css';
import axios from 'axios';
import secrets from '../../secrets.json';
import Loader from '../../loader.gif'
import Bracket from '../Bracket/Bracket';
import Select from '../Select/Select';

class Search extends React.Component{
    constructor( props ) {
        super(props);

        this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
            artistId: '',
            ready: false,
            tournamentSize: 4,
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    /**
     * Fetch the search results and update the state with the result.
     *
     * @param {int} updatedPageNo Updated Page No.
     * @param {String} query Search Query.
     *
     */
    fetchSearchResults = ( query ) => {
        const searchUrl = `https://api.deezer.com/search/artist/?q=${query}&index=0&limit=5&output=json`;

        if (this.cancel) {
            // Cancel the previous request before making a new request
            this.cancel.cancel();
        }
        // Create a new CancelToken
        this.cancel = axios.CancelToken.source();
        axios.get(searchUrl, {
            cancelToken: this.cancel.token
        }).then((res) => {
            const resultNotFoundMsg = !res.data.data.length ? 'There are no more search results. Please try a new search.' : '';
            this.setState({
				results: res.data.data,
				message: resultNotFoundMsg,
				loading: false,
            });
        }).catch((error) => {  

            if (axios.isCancel(error) || error) {
				this.setState({
					loading: false,
					message: 'Failed to fetch results.Please check network',
				});
			}
        });
    };

    renderSearchResults(){
        const {results} = this.state;

        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    {results.map((result) => {
                        return(
                            <a href="/" key={result.id} onClick={this.handleItemSelect.bind(this, result)} className="result-items">
                                    <h6 className="image-username">{result.name}</h6>
                                    <div className="image-wrapper">
                                        <img className="image" src={result.picture} alt={result.name}/>
                                    </div>
                            </a>
                        );
                    })}
                </div>
            );
        }
    }

    handleItemSelect = (result, e) => {
        const artistId = result.id
        e.preventDefault();
        this.setState({
            artistId,
            results: {},
            query: result.name,
            ready: true
        });
    }

    handleOnInputChange = (event) => {
        const query = event.target.value;
        if(!query){
            this.setState({ query, loading: true, message: ''  } );
        }else{
            this.setState({ query, loading: true, message: '' }, () => {
                this.fetchSearchResults(query);
            });
        }
        
    };

    handleShowBrackets = () => {
        if(this.state.bracketReady === true){
            this.setState({bracketReady: false});

        }else{
            this.setState({bracketReady: true});
        }
    }

    handleSelectChange = (value) =>{
        this.setState({tournamentSize: value});
    }
    render(){
        const { query, loading, message, ready, bracketReady } = this.state;
        return(
            <div className="container">
                <Select onChange={this.handleSelectChange}></Select>
                <label className="search-label" htmlFor="search-input">
                
                    <input
                            type="text"
                            value={query}
                            id="search-input"
                            placeholder="Search for an artist..."
                            onChange={this.handleOnInputChange}
                        />
                    
                </label>
                { message && <p className="message">{message}</p> }
                <img  src={Loader} className={`search-loading ${loading ? 'show' : 'hide' }`}  alt="loader"/>
                
                { this.renderSearchResults() }

                { ready && <button className="go-button" onClick={this.handleShowBrackets}>Go!</button>}

                { bracketReady && <Bracket tournamentSize={this.state.tournamentSize} artistId={this.state.artistId}></Bracket> }
            </div>
        )
    }
}
export default Search;
