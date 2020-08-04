import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import './Byadmin.css';

class Bynitin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.name,
            data: []

        }

    }

    componentDidMount() {
        axios.get('/' + this.state.name)
            .then(res => {

                this.setState({
                    data: res.data
                })
            })
    }
    render() {
        var { data } = this.state
        var posts = []
        for (let i = 0; i < data.length; i++) {
            posts.push(

                <div className="row article-by">
                    <div className="col-sm-4">
                        <img src={"/image/" + data[i].imagename} className="im" width="380px" height="300px" alt="post img" />
                    </div>

                    <div className="other-article-details col-sm-8">
                        <h3  ><Link to={"/post/" + data[i]._id}  >{data[i].title}</Link></h3>
                        <p className="other-article-desc"><ReactMarkdown source={data[i].desc} escapeHtml={false} /></p>
                        <h6>Date:{data[i].date}</h6>

                    </div>

                </div>



            )
        }
        return (
            <div>
                <h3 style={{ textAlign: "center" }}>Articles by {this.state.name}</h3>
                <div className="container">

                    {posts}

                </div>


            </div>
        );
    }
}

export default Bynitin;
