import React from 'react';
import axios from 'axios';

import './others.css';


class International extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    };


    componentDidMount() {
        axios.get("/home/international")
            .then(res => {

                this.setState({
                    items: res.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    };



    render() {


        var { items } = this.state;
        var posts = [];
        for (let i = 0; i < items.length; i++) {
            posts.push(
                <div>
                    <h3 key={items[i]._id}>{items[i].title}</h3>
                    <h4 key={items[i].id}>{items[i].desc}</h4>
                </div>
            )
        }
        if (items.length === 0) {
            return (
                <div className="container">
                    <h1> no post yet on international Category</h1>
                </div>

            )
        }
        else {
            return (
                <div>
                    <h3 style={{ textAlign: "center" }}>Category : International</h3>
                    {posts}
                </div>
            )
        }
    }


}

export default International; 