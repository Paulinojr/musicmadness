import React from 'react';
import '../../Search.css';
import axios from 'axios';
import secrets from '../../secrets.json';

class Search extends React.Component{
    constructor( props ) {
        super(props);

        this.state = {
            query: '',
            results: {},
            loading: false,
            message: ''
        }
    }

    /**
     * Fetch the search results and update the state with the result.
     *
     * @param {int} updatedPageNo Updated Page No.
     * @param {String} query Search Query.
     *
     */
    fetchSearchResult = (updatedPageNo = '', query ) => {
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        const searchUrl = `https://api.deezer.com/search/artist/?q=${query}&index=0&limit=${pageNumber}&output=json`;

        if (this.cancel) {
            // Cancel the previous request before making a new request
            this.cancel.cancel();
        }
        // Create a new CancelToken
        this.cancel = axios.CancelToken.source();
        axios.get(searchUrl, {
            cancelToken: this.cancel.token
        }).then((res) => {
            console.log(res)
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

    handleOnInputChange = (event) => {
        const query = event.target.value;
        if(!query){
            this.setState({ query, loading: true, message: ''  } );
        }else{
            this.setState({ query, loading: true, message: '' }, () => {
                this.fetchSearchResult(5, query);
            });
        }
        
    };

    render(){
        return(
            <div className="container">
                <label className="search-label" htmlFor="search-input">
                    <input
                            type="text"
                            
                            id="search-input"
                            placeholder="Search for an artist..."
                            onChange={this.handleOnInputChange}
                        />
                    <i className="fa fa-search search-icon"/>
                    
                </label>
            </div>
        )
    }
}
export default Search;
