import React from 'react';

class Select extends React.Component{
    constructor( props ){
        super(props);

        this.state = {
            size: 64
        };
    }

    handleSelectChange(){
        console.log('nothing')
    }

    render(){
        return(
            <div className="size-label">
                <label> Select tournament size </label>
                <select onChange={this.handleSelectChange}>
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="32">32</option>
                    <option value="64">64</option>
                </select>
            </div>
        );
    }
}

export default Select