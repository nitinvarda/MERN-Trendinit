import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from "react-router-dom";

import './others.css';
import ReactMarkdown from 'react-markdown';

class Others extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    };
    componentDidMount() {
        axios.get("/home/others")
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


                <div className="row ps">

                    <div className="col-md-4">
                        <img src={"/image/" + items[i].imagename} className="im" alt="post img" />
                    </div>

                    <div className="other-article-details col-md-8">
                        <h3  ><Link to={"/post/" + items[i]._id}  >{items[i].title}</Link></h3>
                        <p className="other-article-desc"><ReactMarkdown source={items[i].desc} escapeHtml={false} /></p>
                        <h6>By:<Link to={"by/" + items[i].by}>{items[i].by}</Link>--Date:{items[i].date}</h6>

                    </div>
                    <hr />



                </div>


            )
        }
        return (



            <div className="container">
                <h3 style={{ textAlign: "center" }}>Category : Others</h3>
                {posts}


            </div>



        );
    }
}

export default Others;
