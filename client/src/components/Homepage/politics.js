import React from 'react';
import axios from 'axios';
import {

    Link
} from "react-router-dom";
import './others.css';
import ReactMarkdown from 'react-markdown';


class Politics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    };


    componentDidMount() {
        axios.get("/home/politics").then(res => {

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
                <React.Fragment >
                    <div className="col-sm-4">
                        <img src={"/image/" + items[i].imagename} className="im" width="380px" height="300px" alt="post img" />
                    </div>

                    <div className="other-article-details col-sm-8">
                        <h3  ><Link to={"/post/" + items[i]._id}  >{items[i].title}</Link></h3>
                        <p className="other-article-desc"><ReactMarkdown source={items[i].desc} escapeHtml={false} /></p>
                        <h6>By:{items[i].by}--Date:{items[i].date}</h6>

                    </div>

                </React.Fragment>
            )
        }
        if (items.length === 0) {
            return (
                <div className="container">
                    <h1> no post yet on politics Category</h1>
                </div>

            )
        }
        else {
            return (
                <div>
                    <h3 style={{ textAlign: "center" }}>Category : Politics</h3>
                    <div className="container" >
                        <div className="row ps" >
                            {posts}
                        </div>

                    </div>
                </div>
            )
        }
    }


}

export default Politics; 