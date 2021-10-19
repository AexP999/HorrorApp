// import { useEffect } from 'react';
// import ReactDOM from 'react-dom';

// const Portal = ({ children }) => {
//   const el = document.createElement('div');
//   console.log(children);
//   useEffect(() => {
//     document.body.appendChild(el);
//     return () => {
//       document.body.removeChild(el);
//     };

//   });

//   return ReactDOM.createPortal(children, el);


// };
// export default Portal;

import { Component } from 'react';
import ReactDOM from 'react-dom';

class Portal extends Component {
  el = document.createElement('div');

  componentDidMount () {
    document.body.appendChild(this.el);
  }

  componentWillUnmount () {
    document.body.removeChild(this.el);
  }

  render () {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);

  }
}
export default Portal;

