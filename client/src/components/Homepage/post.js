import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import './post.css';


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            data: []
        }
    }
    componentDidMount() {
        axios.get("/article/" + this.state.id)
            .then(res => {

                this.setState({
                    data: res.data[0]
                })

            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        const markdown = this.state.data.desc;
        return (
            <div className="container post">
                <div className="post-start">
                    <div className="post-details">
                        <img src={"/image/" + this.state.data.imagename} className="post-img" alt="post img" />
                        <div className="post-title" >
                            <h1 >{this.state.data.title}</h1>
                        </div>
                        <hr />



                    </div>




                    <div className="post-desc">


                        <h6>By:<Link to={"/by/" + this.state.data.by}>{this.state.data.by}</Link>--Date:{this.state.data.date}</h6>
                        <h3><ReactMarkdown source={markdown} escapeHtml={false} /></h3>
                        {/* <div>{this.state.data.desc}</div> */}


                    </div>



                </div>

            </div>


        );
    }
}

export default Post;
