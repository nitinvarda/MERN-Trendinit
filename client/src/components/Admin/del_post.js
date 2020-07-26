import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class delpost extends Component {



    render() {
        return (
            <div>
                <h3>deleted post successfully</h3>
                <h3>Go to<Link to="/admin-home"> Admin page </Link> </h3>

            </div>

        );
    }
}

export default delpost;
