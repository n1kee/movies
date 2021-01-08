import '../App/App.css';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import http from "../http";
import history from "../history";
import {AppContext} from "../globals";
import Component from "../Component";

class MovieList extends Component {

    static contextType = AppContext;

    rowsPerPage = 10;

    state = {
        items: [],
        itemsTotal: 0,
        page: 1,
        orderBy: "",
        orderDirection: false,
    };

    onItemClick(id) {
        console.log("onItemClick", id);
        history.push("/movies/" + id);
    }

    onLikeBtnClick(evt, movie) {
        console.log("onLikeBtnClick", movie);
        evt.stopPropagation();
        if (Number.isInteger(movie.like_id)) {
            this.unlikeMovie(movie);
        } else {
            this.likeMovie(movie);
        }
    }

    likeMovie(movie) {
        http(`/movies/${movie.id}/like`, {}, "POST").then(res => {
            console.log("%%%");
            movie.like_id = +res.data;
            const updatedItems = [].slice.call(this.state.items);
            this.setState({ items: updatedItems });
        });
    }

   unlikeMovie(movie) {
        http(`/movies/unlike/${movie.like_id}`, {}, "POST").then(res => {
            console.log("%%%");
            movie.like_id = null;
            const updatedItems = [].slice.call(this.state.items);
            this.setState({ items: updatedItems });
        });
    }

    changePage(page) {
        this.context.updateGlobals({ isLoading: true });
        const params = { page: page + 1, };
        http(this.props.url || '/movies', params).then(res => {
            console.log("%%%", );
            this.setState({
                page,
                items: res.data.movies || [],
                itemsTotal: res.data.movies_total,
            }, () => {
                this.context.updateGlobals({ isLoading: false });
            });
        });
    }

    componentDidMount() {
        this.changePage(0);
    }

    render() {
        return (
            <React.Fragment>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.items.map(item => (
                          <TableRow key={item.id} onClick={() => this.onItemClick(item.id)}>
                              <TableCell>{item.title}</TableCell>
                              <TableCell className="float-right">
                                  <button onClick={event => this.onLikeBtnClick(event, item)}>
                                      {Number.isInteger(item.like_id) ? "Unlike" : "Like"}
                                  </button>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={this.state.itemsTotal}
                  rowsPerPage={this.rowsPerPage}
                  rowsPerPageOptions={[]}
                  page={this.state.page}
                  onChangePage={(evt, newPage) => this.changePage(newPage)}
                />
            </React.Fragment>
        );
  }
}

export default MovieList;
