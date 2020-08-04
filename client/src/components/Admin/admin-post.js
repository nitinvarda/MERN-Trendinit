import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from "axios";

class Adminpost extends Component {
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
        return (
            <div className="container post">
                <div className="post-start">
                    <div className="post-details">
                        <img src={"/image/" + this.state.data.imagename} className="post-img" alt="post-img" />
                        <div className="post-title" >
                            <h1 >{this.state.data.title}</h1>
                            <button className="btn btn-secondary" ><Link to={{ pathname: "/edit", state: this.state.id }} style={{ color: "white" }}>Edit</Link></button>
                        </div>
                        <hr />



                    </div>




                    <div className="post-desc">


                        <h6>By:<Link to={"/by/" + this.state.data.by}>{this.state.data.by}</Link>--Date:{this.state.data.date}</h6>
                        <h3><ReactMarkdown source={this.state.data.desc} escapeHtml={false} /></h3>



                    </div>



                </div>

            </div>
        );
    }
}

export default Adminpost;
