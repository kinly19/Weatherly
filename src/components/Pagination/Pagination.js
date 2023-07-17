import { forwardRef } from 'react';
import './Pagination.scss';

const Pagination = forwardRef((props, ref) => {

  return (
    <ul className={props.className ? `paginate ${props.className}` : "paginate"} ref={ref}>
      {props.children}
      <div className="paginate__btn-wrapper">
        <button className="paginate__btn" onClick={() => props.paginate(1)}>Prev</button>
        <button className="paginate__btn" onClick={() => props.paginate(2)}>Next</button>
      </div>
    </ul>
  );
});

export default Pagination;