import React from 'react';
import axios from 'axios';
import Track from '../Track/Track';


class Bracket extends React.Component{
    constructor( props ){
        super(props);

        this.state = {
            tracks: [],
            message: '',
            sortedTracks: []
        };
    }

    componentDidMount(){
        this.getTracks();
    }

    getTracks = () => {
        const searchUrl = `https://api.deezer.com/artist/${this.props.artistId}/top?limit=64`;

        if (this.cancel) {
            // Cancel the previous request before making a new request
            this.cancel.cancel();
        }
        // Create a new CancelToken
        this.cancel = axios.CancelToken.source();
        axios.get(searchUrl, {
            cancelToken: this.cancel.token
        }).then((res) => {
            const resultNotFoundMsg = !res.data.data.length ? 'There are no songs for this artist.' : '';
            this.setState({
				tracks: res.data.data,
				message: resultNotFoundMsg,
            });
            //sort tracks by tournament size
            this.sortTracks();
        }).catch((error) => {  

            if (axios.isCancel(error) || error) {
				this.setState({
					message: 'Failed to fetch results.Please check network',
				});
			}
        });
    }

    sortTracks(){
        let a = this.state.tracks;
        let sortedTracks = [];
        for(let i = a.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i);
            const temp = a[i];
            a[i] = a[j];
            a[j] = temp;
          }

        for(let c = 0; c < this.props.tournamentSize; c++){
            sortedTracks.push(a[c]);
        }

        this.setState({sortedTracks});

        console.log(sortedTracks);
    }

    render(){
        return(
            <div>
                {this.state.sortedTracks.map(function(item, i){
                    return <Track key={i} albumCover={item.album.cover} title={item.title} albumTitle={item.album.title} preview={item.preview}>Test</Track>
                })
                }
            </div>
        );
    }
}


export default Bracket;