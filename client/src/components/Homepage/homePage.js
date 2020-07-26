import React from 'react';
import axios from 'axios';
import {

    Link
} from "react-router-dom";

import './homePage.css';
import ReactMarkdown from 'react-markdown';



class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }

    };





    // this is default home page mount were data is directly fetched when we open the page thorugh componentDidMount()
    componentDidMount() {
        axios.get("/home")
            .then(res => {

                this.setState({
                    items: res.data
                })

            })
            .catch(err => {
                console.log(err);
            });
    };


    // render starts from here any program manipulation is done here 
    render() {
        // using ES6 destructuring we are pulling items from this.state object
        var { items } = this.state;

        // creating two empty array which will be have data later
        // the reason for creating two array's is one is for top three posts which we see on opening the site , the other is for recent posts down in home page

        var posts = [];
        var oldposts = [];

        // items is json object which contain data of articles 
        var slice = items.slice(0, 3);
        // creating a for loop to add the latest three posts 
        for (let i = 0; i < slice.length; i++) {
            posts.push(

                <div className="first " style={{ backgroundImage: `url(${"/image/" + this.state.items[i].imagename})` }}>
                    <div className="text">
                        <h4> <Link to={"/post/" + this.state.items[i]._id} style={{ color: 'white', textDecoration: 'none' }} >{this.state.items[i].title}</Link> </h4>

                    </div>
                    <div className="overlay"></div>
                </div>);
        }


        // creating a for loop to add the recent  posts other than top 3 
        for (var i = 3; i < this.state.items.length; i++) {

            oldposts.push(
                <div className="old-article-start">
                    <img src={"/image/" + this.state.items[i].imagename} className="img" alt="article img" />
                    <div className="article-details">
                        <h3  ><Link to={"/post/" + this.state.items[i]._id} >{this.state.items[i].title}</Link></h3>
                        <p className="article-desc"><ReactMarkdown source={this.state.items[i].desc} escapeHtml={false} /></p>
                        <h6>By:<Link to={"/by/" + this.state.items[i].by}>{this.state.items[i].by}</Link>--Date:{this.state.items[i].date}</h6>

                    </div>

                    <br />
                </div>

            )
        }





        return (
            // react.fragment is a ghost div , which does not appear in actual page
            <React.Fragment>
                <div className="main-content" >
                    <div className="actual">
                        {posts}  {/* this is the above created top three posts */}
                    </div>
                    <hr />
                    <h3 style={{ textAlign: 'center' }}>Recent Stories</h3>
                    <div className="container ">
                        <div className="row">
                            <div className="col-sm-3"  >
                                <div className=" side-content">
                                    <div>
                                        <h4 style={{ textAlign: 'center', paddingTop: 10 }}>Categories</h4>
                                        <hr />
                                        <ul className="cat-list">
                                            <li><Link to="/sports" style={{ textDecoration: 'none', color: 'white' }}>Sports</Link></li>
                                            <li><Link to="/politics" style={{ textDecoration: 'none', color: 'white' }}>Politics</Link></li>
                                            <li><Link to="/technology" style={{ textDecoration: 'none', color: 'white' }}>Technology</Link></li>
                                            <li><Link to="/cinema" style={{ textDecoration: 'none', color: 'white' }}>Cinema</Link></li>
                                            <li><Link to="/international" style={{ textDecoration: 'none', color: 'white' }}>International</Link></li>
                                            <li><Link to="/others" style={{ textDecoration: 'none', color: 'white' }}>Others</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-9">
                                {oldposts} {/* this is all recent posts */}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomePage;