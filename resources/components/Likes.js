import React from 'react';
import {Link} from "react-router-dom";
import Component from "./Component";
import MovieList from "./MovieList/MovieList";

class Likes extends Component {
    render() {
        return (
          <React.Fragment>
              <div>
                  <Link className="float-right" to="/">
                      <button className="btn btn-info">Close</button>
                  </Link>
                  <div className="clearfix"></div>
              </div>
              <MovieList resource="/movies/likes"></MovieList>
          </React.Fragment>
        );
    }
}

export default Likes;
