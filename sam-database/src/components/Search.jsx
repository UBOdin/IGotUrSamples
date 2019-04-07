import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

class Search extends Component {
    render() {
        return (
            <div>
                <InputGroup>
                    <FormControl type="text" placeholder="Search"/>
                    <InputGroup.Append>
                        <Button variant="outline-dark">Search</Button>
                    </InputGroup.Append>
                </InputGroup> 
                <hr />
            </div>                   
        )
    };
}

export default Search;
