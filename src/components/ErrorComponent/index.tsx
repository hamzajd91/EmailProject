import React, { useEffect, useState } from 'react';
import './index.scss';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as companyProfileActions from '../../store/ducks/companyProfile/actions';
import errorCodes from '../../data/errCodes';
import errorImage from '../../images/errorImage.png';
import { CompanyProfileState } from '../../store/ducks/companyProfile/types';

interface StateProps {
  profile: CompanyProfileState;
}
interface DispatchProps {
  getProfile(params: any): void;
}
type Props = DispatchProps & StateProps;
function ErrorComponent(props: Props) {
  const [error, setError] = useState<{}>();
  const [message, setMessage] = useState<{}>();
  const [code, setCode] = useState<any>();
  const { profile } = props;

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('err');
    const successCode = url.searchParams.get('code');
    const cid = url.searchParams.get('companyId');
    if (cid) {
      props.getProfile({ id: cid });
    }
    if (code) {
      setError(errorCodes(code));
      setCode(code);
    }
    if (successCode) {
      setMessage(errorCodes(successCode));
    }
  }, []);
  return (
    <div className="error-wrapper container">
      <p className="error-text">
        {Number(code) === 2100 && profile.profile
          ? `You have already relinquished the ownership of ${profile.profile.name}. ${profile.profile.claimed ? profile.profile.claimed.name : ''} is now the owner of the company profile.`
          : error}
      </p>
      <div style={{ marginTop: '100px' }}>
        <p className="error-text">{message}</p>
      </div>
      <br />
      {error && <img alt="errorImage" src={errorImage} />}
      <br />
    </div>
  );
}
const mapStateToProps = (state: ApplicationState) => ({
  profile: state.profile,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(companyProfileActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
