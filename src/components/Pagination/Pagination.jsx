import './Pagination.css';

const Pagination = ({ queryUsersQty, usersQtyPerPage, setCurrentPage, currentPage }) => {

  const pageQty = Math.ceil(queryUsersQty / usersQtyPerPage);

  console.log('pageQty', pageQty);

  const turnToPage = (i) => {
    setCurrentPage(i);
  };

  return (
    <div className='pagination'>
      { currentPage !== 1
        ? <i className=' fas fa-chevron-left' onClick={ () => turnToPage(currentPage - 1) }></i>
        : '' }

      { [ ...Array(pageQty) ].map((el, i) => (
        <div onClick={ () => turnToPage(i + 1) } key={ i }  >

          { i + 1 === 1
            ? i + 1 !== currentPage
              ? <div className={ currentPage !== i + 1 ? 'number-cell'
                : 'number-cell-flag' }>{ i + 1 }</div>
              : ''
            : '' }

          { i + 1 === currentPage
            ? <div className="point-view">
              { i + 1 !== 1 ? <span>..</span> : '' }
              <div className="number-cell-flag" >{ currentPage }</div>
              { i + 1 !== pageQty ? <span>..</span> : '' }
            </div>
            : '' }

          { i + 1 === pageQty
            ? i + 1 !== currentPage
              ? <div className={ currentPage !== i + 1 ? 'number-cell'
                : 'number-cell-flag' }>{ i + 1 }</div>
              : ''
            : '' }
        </div>
      )
      ) }
      { pageQty > 1
        ? (currentPage !== pageQty
          ? <i className=' fas fa-chevron-right' onClick={ () => turnToPage(currentPage + 1) }></i>
          : '')
        : '' }
    </div >
  );
};
export default Pagination;