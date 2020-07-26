import React from 'react';
import axios from 'axios';



class Cinema extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    };


    componentDidMount() {
        axios.get("/home/cinema").then(res => {

            this.setState({
                items: res.data
            })
        });
    };



    render() {


        var { items } = this.state;
        var posts = [];
        for (let i = 0; i < items.length; i++) {
            posts.push(
                <div>
                    <h1 key={items[i]._id}>{items[i].title}</h1>
                    <h4 key={items[i].id}>{items[i].desc}</h4>
                </div>
            )
        }
        if (items.length === 0) {
            return (
                <div className="container">
                    <h1> no post yet on Cinema Category</h1>
                </div>

            )
        }
        else {
            return (
                <div>
                    <h3 style={{ textAlign: "center" }}>Category : Politics</h3>
                    {posts}
                </div>
            )
        }
    }


}

export default Cinema;