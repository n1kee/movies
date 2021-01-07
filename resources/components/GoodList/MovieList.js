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

class MovieList extends React.Component {

    constructor(props) {
        super(props);
        this.rowsPerPage = 10;
        this.state = {
            items: [],
            itemsTotal: 0,
            page: 1,
            orderBy: "",
            orderDirection: false,
        };
    }

    onItemClick(id) {
        console.log("onItemClick", id);
        history.push("/movies/" + id);
    }

    changePage(page) {
        const params = { page: page + 1, };
        http('/movies', params).then(res => {
            this.setState({
                page,
                items: res.data.movies || [],
                itemsTotal: res.data.movies_total,
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
                              <TableCell></TableCell>
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
