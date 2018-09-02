import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // get clicked page number and update page number
  handleClick(data) {
    const { selected } = data;
    const { fetchLayers } = this.props;

    fetchLayers(selected + 1);
  }

  render() {
    const { pageCount } = this.props;

    return (
      <div className="paginate">
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel={<a href=" ">...</a>}
          breakClassName="break-me"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          onPageChange={this.handleClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />
      </div>
    );
  }
}

export default Pagination;
