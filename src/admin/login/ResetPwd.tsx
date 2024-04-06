import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';

const ResetPwd = (props: any) => {
  const history = useNavigate();

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center align-items-center py-4">
          <div className="col-md-7 mt-3">
            <div className="p-4 rounded-lg bg-primary text-white font-medium-3">
              <FontAwesomeIcon icon={faUnlock} className="mr-2" />
              Reset Password
            </div>
          </div>
          <div className="col-md-7 mt-5">
            <div className="shadow bg-white rounded p-5 px-3 pb-3 position-relative">
              <input type="text" className="form-control p-4 mt-4" placeholder="Email" />
              <button type="button" className="btn btn-primary waves-effect waves-light d-block mx-auto mt-3 py-2 px-4">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPwd;
