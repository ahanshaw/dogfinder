import {useState} from 'react';

export function Pagination({ page, totalPages, nextPage, prevPage }){

  return (
      <div className="pagination">
      {page > 1 &&
          <button className="btn btn-page btn-page--prev" onClick={prevPage}>&#8249;</button>
      }
      <span className="current">{page} of {totalPages}</span>
      {page < totalPages &&
          <button className="btn btn-page btn-page--next" onClick={nextPage}>&#8250;</button>
      }
      </div>
  );
}
