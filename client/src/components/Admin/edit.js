import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './edit.css';

import mark from 'marked';


class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmation: '',
            title: '',
            desc: '',
            by: '',
            date: '',

            post_data: [],
            id: this.props.location.state,
            imagefile: ""

        }
        this.post = this.post.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileHandler = this.fileHandler.bind(this);
    }



    componentDidMount() {
        axios.get("/edit/" + this.state.id)
            .then(res => {

                this.setState({
                    post_data: res.data,
                    title: res.data.title,
                    by: res.data.by,
                    desc: res.data.desc,
                    date: res.data.date
                })
            })
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

    }
    fileHandler(e) {
        this.setState({
            imagefile: e.target.files[0]
        })

    }


    post(e) {
        e.preventDefault();
        var { id, title, desc, by, category, imagefile, date } = this.state;
        var marked_down = mark(desc);
        var form = new FormData();

        form.append("myImage", imagefile);
        form.append("title", title);
        form.append("category", category);
        form.append("desc", marked_down);
        form.append("by", by);
        form.append("date", date);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post("/update/" + id, form, config)
            .then(response => {

                this.setState({
                    confirmation: response.data
                })
            })
    }







    render() {

        if (this.state.confirmation === "success") {
            return <Redirect to={{ pathname: "/admin-home" }} />;
        }

        return (


            <div className="divstyle">
                <h3 style={{ textAlign: "center", paddingTop: "10px" }}>Edit Post
                <hr /></h3>

                <form onSubmit={this.post} className="formstyle" >
                    <label><h3>Title</h3></label>

                    <input type="text" name="title" className="titletext" value={this.state.title} onChange={this.onChange} />
                    <br />
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
                                    <option value="International">International</option>
                                    <option value="Others">Others</option>
                                </select>

                            </div>

                        </div>
                        <div className="by" >
                            <label><h4>By:</h4></label>
                            <input type="text" name="by" className="byinput" value={this.state.by} onChange={this.onChange} />

                        </div>


                    </div>
                    <label>upload an Image</label>
                    <input type="file" name="myImage" onChange={this.fileHandler} />

                    <br />
                    <div className="desc">
                        <label><h4>Description</h4> </label>
                        <textarea name="desc" rows="4" cols="50" onChange={this.onChange} value={this.state.desc} />
                    </div>

                    <input type="submit" className="postbtn" value="Post changes" />
                </form>


            </div>



        );



    }
}

export default Edit;
