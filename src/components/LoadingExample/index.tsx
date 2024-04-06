import React from 'react';

import './index.scss';
import { Loading, Loader } from '../Loader';

// interface Props {
//   showSubNav: boolean
// }

function LoadingExample() {
  return (
    <div>
      <Loader />
      <Loader />
      <Loader />
      <div>
        <Loader />
      </div>

      <div>
        <div>
          <Loading />
        </div>
      </div>
    </div>
);
}

export default LoadingExample;
