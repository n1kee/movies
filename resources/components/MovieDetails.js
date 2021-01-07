import './App/App.css';
import React from 'react';
import http from "./http";
import {ToastContainer} from 'react-toastify';
import {AppContext} from "./globals";
import {Link} from "react-router-dom";

class MovieDetails extends React.Component {

    static contextType = AppContext;

    contentLoading = true;
    imageLoading = true;

    state = {
        formClassName: "form position-relative",
    };

    onImageLoad() {
        this.imageLoading = false;
        if (!this.contentLoading) {
            this.context.updateGlobals({ isLoading: false });
        }
    }

    get movieId() {
        return this.props.match.params.movieId;
    }

    getMovie() {
        this.context.updateGlobals({ isLoading: true });
        http(
            `/movies/${this.movieId}`,
        ).then(res => {
            this.setState(res.data);
            this.contentLoading = false;
            if (!this.imageLoading) {
                this.context.updateGlobals({ isLoading: false });
            }
        });
    }

    componentDidMount() {
        this.getMovie();
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <React.Fragment>
                <table className={this.state.formClassName}>
                    <tbody>
                        <tr>
                            <td colSpan="2" className="text-center">
                                {
                                    this.state.movie &&
                                    <img
                                        src={this.context.imgHost + this.state.movie?.img}
                                        onLoad={() => this.onImageLoad()}
                                        onError={() => this.onImageLoad()}
                                    />
                                }

                            </td>
                        </tr>
                        <tr>
                            <td>Title:</td>
                            <td>{this.state.movie?.title}</td>
                        </tr>
                        <tr>
                            <td>Year:</td>
                            <td>{this.state.movie?.year}</td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>{this.state.movie?.description}</td>
                        </tr>
                        <tr>
                            <td>Rating:</td>
                            <td>{this.state.movie?.rating}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <Link to="/">
                                    <button className="btn btn-info">Close</button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ToastContainer/>
            </React.Fragment>
        );
    }
}

export default MovieDetails;
