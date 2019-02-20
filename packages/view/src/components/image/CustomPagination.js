import { Pagination } from "antd";
import React from "react";

function CustomPagination({ onPageChange, length }) {
  return (
    <div className="pagination">
      <Pagination defaultCurrent={1} total={length} defaultPageSize={9} onChange={onPageChange} />
    </div>
  );
}

export default CustomPagination;
