import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';
import { linkedinUser } from '../../store/ducks/auth/actions';
import {connect} from "react-redux";
import appApi from '../../services/appApi';


const LoginCallback = (props : any) => {
    const history = useNavigate();
    console.log('-------props------', props.location.search);

        // const response = appApi.get(
        //   `http://192.168.29.204:3000/api/v1/users/linkedin/callback${props.location.search}`
        // );

    const response = appApi.get(`/v1/users/linkedin/callback${props.location.search}`);

    console.log("------response----------", response);
    

    // props.linkedinUserCall(props.location.search);

    // history.replace('/firms');

  return (
    <div>
      <label> Callback return</label>
    </div>
);
};

// export default LoginCallback;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  linkedinUserCall: (params: any) => dispatch(linkedinUser(params)),
});

const mapStateToProps = (state: ApplicationState) => {
  const data = state.auth.getLoginUser;

  return {
    getUserDetail: state.auth.getLoginUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginCallback);
