import React from 'react';
import axios from 'axios';



import {
    Link,
    Redirect
} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import './adminhome.css';


export default class Adminhome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: '',
            items: [],
            edit_data: [],
            edit: false,
            newpost: false,

            auth: this.props.location.state,
            delete: "",
            delete_data: "",

        }
        this.handleEdit = this.handleEdit.bind(this);
        this.logout = this.logout.bind(this);

        this.newpost = this.newpost.bind(this);
        this.delete = this.delete.bind(this);
    };




    componentDidMount() {
        axios.get("/adminhome").then(res => {
            this.setState({
                items: res.data,

            })
        });
    };

    handleEdit(e) {

        axios.get("/edit/" + e.target.id)
            .then(res => {
                this.setState({
                    edit: true,
                    edit_data: res.data
                })

            })
            .catch(err => {
                console.log(err)
            })

    }


    logout(e) {
        this.setState({
            auth: false
        })
    }

    newpost(e) {
        this.setState({
            newpost: true
        })
    }

    delete(e) {
        var id = e.target.id;
        axios.post("/delete/" + id)
            .then(res => {
                this.setState({
                    delete: res.data
                })
            })

    }

    render() {

        if (this.state.edit) {
            return (<Redirect to={{ pathname: "/edit", state: { data: this.state.edit_data } }} />);
        }
        else if (this.state.newpost) {
            return (<Link to="/add" />);
        }
        else if (this.state.delete === "deleted successfully") {
            return (


                <Redirect to={{ pathname: "/del-post" }} />

            );
        }
        else if (this.state.items === 'unauthorized') {
            return (<div>
                <h1>authentication failed</h1>
                <Redirect to="/admin" />
            </div>);
        }

        else {
            var { items } = this.state;
            var posts = [];
            for (let i = 0; i < items.length; i++) {
                posts.push(
                    <div className="row">
                        <div className="col-sm-3">
                            <img src={"/image/" + items[i].imagename} className="adminhome-article-img" alt="post img" />

                        </div>
                        <div className="adminhome-article col-sm-9">


                            <h3><Link to={"/admin-post/" + items[i]._id} >{items[i].title}</Link></h3>

                            <h5>Article by:<b><i>{items[i].by}</i></b> --&nbsp; Category:<b><i> {items[i].category}</i></b> --&nbsp; Date: {items[i].date} - IST  </h5>
                            <br />
                            <h4 className="admin-home-desc"><ReactMarkdown source={items[i].desc} escapeHtml={false} /></h4>
                            <br />

                            <buttton type="button" className="btn btn-secondary"><Link to={{ pathname: "/edit", state: items[i]._id }} style={{ color: "white" }}>Edit</Link></buttton>
                            <button onClick={this.delete} id={items[i]._id} type="button" className="btn btn-danger del">Delete</button>
                            <hr />




                        </div>

                    </div>
                )
            }

            return (



                <div className="container admin-start">


                    <h1>Welcome Admin</h1>
                    <button onClick={this.logout} className="btn btn-danger">Logout</button>
                    <Link to="/add" className="btn btn-primary">New Post</Link>
                    <hr />
                    <div>{posts}</div>

                </div>



            );

        }


    }

}


