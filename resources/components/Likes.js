import React from 'react';
import {Link} from "react-router-dom";
import Component from "./Component";
import MovieList from "./MovieList/MovieList";

class Likes extends Component {
    render() {
        return (
          <React.Fragment>
              <MovieList resource="/movies/likes"></MovieList>
              <Link className="float-right" to="/">
                  <button className="btn btn-info">Close</button>
              </Link>
          </React.Fragment>
        );
    }
}

export default Likes;
