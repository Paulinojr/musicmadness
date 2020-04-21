import React from 'react';

class Select extends React.Component{
    constructor( props ){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange( event ){
        const value = event.target.value;
        this.props.onChange(value);
    }

    render(){
        return(
            <div className="size-label">
                <label> Select tournament size </label>
                <select onChange={this.handleChange} value={this.props.value}>
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