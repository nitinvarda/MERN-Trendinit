import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import './edit.css';
import marked from 'marked';



class add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            by: "",
            desc: "",
            category: "",
            imagename: "",
            confirmation: "",
            imagefile: ""

        }
        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileHandler = this.fileHandler.bind(this);
    }

    submit(e) {
        e.preventDefault();
        var { desc } = this.state;
        const marked_desc = marked(desc);
        const form = new FormData();
        form.append("myImage", this.state.imagefile);
        form.append("title", this.state.title);
        form.append("category", this.state.category);
        form.append("desc", marked_desc);
        form.append("by", this.state.by);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };



        // console.log(add);
        axios.post("/add", form, config)
            .then(res => {
                console.log(res);
                this.setState({
                    confirmation: res.data
                })
            })
            .catch(err => {
                console.log(err);
            });




    }
    fileHandler(e) {
        this.setState({
            imagefile: e.target.files[0]
        })

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }



    render() {
        if (this.state.confirmation === "success") {
            return <Redirect to={{ pathname: "/admin-home", state: { auth: true } }} />;
        }
        return (
            <div className="divstyle">
                <h3 style={{ textAlign: "center", paddingTop: "10px" }}>Add Post
                <hr /></h3>
                <form onSubmit={this.submit} className="formstyle" >
                    <label><h4>Title</h4></label>
                    <input type="text" name="title" className="titletext" value={this.state.title} onChange={this.onChange} />

                    <div className="catandby">
                        <div className="cat">
                            <div>
                                <label><h4>Category: </h4></label>
                            </div>
                            <div>
                                <select name="category" className="category" onChange={this.onChange}>
                                    <option>Select Category</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Movies">Movies</option>
                                    <option value="Politics">Politics</option>
                                    <option value="Technology">Technology</option>
                                    <option value="International">International</option>
                                    <option value="Others">Others</option>
                                </select>

                            </div>

                        </div>
                        <div className="by" >
                            <label><h4>by</h4></label>
                            <input type="text" name="by" className="byinput" value={this.state.by} onChange={this.onChange} />

                        </div>
                    </div>
                    <label>upload an Image</label>
                    <input type="file" name="myImage" onChange={this.fileHandler} />


                    <br />
                    <div className="desc">
                        <label><h4>Description</h4></label>
                        <textarea name="desc" rows="4" cols="50" value={this.state.desc} onChange={this.onChange} />

                    </div>


                    <input type="submit" className="postbtn" value="POST" />
                </form>



            </div>
        );
    }
}

export default add;
