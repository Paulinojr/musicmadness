import React from 'react';

class Bracket extends React.Component{
    constructor( props ){
        super(props);

        this.state = {
            tracks: []
        };
    }

    componentDidMount(){
        this.getTracks();
    }

    getTracks = () => {
        console.log("id artist: ", this.props.artistId);
    }

    render(){
        return(
            <div>
                hello
            </div>
        );
    }
}


export default Bracket;