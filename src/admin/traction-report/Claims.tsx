import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "../../store";
import { getClaims } from './../../store/ducks/claims/actions';
import { saveAs } from 'file-saver';


type Props = any;
const Claims = (props: Props) => {
  const [type, setType] = useState(props.location.state.type)
  const [data, setData] = useState([])
  

  const XlsxPopulate = require('xlsx-populate');

  const getSheetData = (data: any, header: any) => {
    const fields = Object.keys(data[0]);
    const sheetData = data.map((row: { [x: string]: any; }) => fields.map(fieldName => (row[fieldName] ? row[fieldName] : '')));
    sheetData.unshift(header);
    return sheetData;
  };


  async function saveAsExcel() {
    const newData:any[] = [];

    if (data !== undefined) {
      switch (type) {
        case 'users':
          data.map((element: any, index: number) => {
            newData.push({
              'id': element.id !== null ? element.id : '',
              'firstName': element.firstName !== null ? element.firstName : '',
              'lastName': element.lastName !== null ? element.lastName : '',
              'email': element.email !== null ? element.email : '',
              'company': element.company !== null ? element.company : '',
              'title': element.title !== null ? element.title : '',
              'industry': element.industry !== null ? element.industry : '',
              'location': element.location !== null ? element.location : '',
              'headline': element.headline !== null ? element.headline : '',
              'createdAt': element.createdAt !== null ? element.createdAt : '',
              'verified': element.verified !== null ? element.verified : ''
            })
          })
          break;
        case 'reviews':
          data.map((element: any, index: number) => {
            newData.push({
              'company_name': element.company_name !== null ? element.company_name : '',
              'user_name': element.user_name !== null ? element.user_name : '',
              'user_id': element.user_id !== null ? element.user_id : '',
              'user_email': element.user_email !== null ? element.user_email : '',
              'review_date': element.review_date !== null ? element.review_date : '',
              'company_address': element.company_address !== null ? element.company_address : '',
              'company_country': element.company_country !== null ? element.company_country : '',
              'company_email': element.company_email !== null ? element.company_email : '',
              'company_city': element.company_city !== null ? element.company_city : '',
              'company_id': element.company_id !== null ? element.company_id : ''
            })
          })
          break;
        case 'claims':
          data.map((element: any, index: number) => {
            newData.push({
              'company_name': element.company_name !== null ? element.company_name : '',
              'user_name': element.user_name !== null ? element.user_name : '',
              'user_id': element.user_id !== null ? element.user_id : '',
              'user_email': element.user_email !== null ? element.user_email : '',
              'claim_date': element.claim_date !== null ? element.claim_date : '',
              'company_address': element.company_address !== null ? element.company_address : '',
              'company_country': element.company_country !== null ? element.company_country : '',
              'company_email': element.company_email !== null ? element.company_email : '',
              'company_city': element.company_city !== null ? element.company_city : '',
              'company_id': element.company_id !== null ? element.company_id : ''
            })
          })
          break;
        case 'free':
          data.map((element: any, index: number) => {
            newData.push({
              'company_name': element.company_name !== null ? element.company_name : '',
              'company_address': element.company_address !== null ? element.company_address : '',
              'company_country': element.company_country !== null ? element.company_country : '',
              'company_email': element.company_email !== null ? element.company_email : '',
              'company_city': element.company_city !== null ? element.company_city : '',
              'company_id': element.company_id !== null ? element.company_id : '',
              'payment_date': element.payment_date !== null ? element.payment_date : '',
              'stripeCustomerId': element.stripeCustomerId !== null ? element.stripeCustomerId : ''
            })
          })
          break;
        case 'basic':
          data.map((element: any, index: number) => {
            newData.push({
              'company_name': element.company_name !== null ? element.company_name : '',
              'company_address': element.company_address !== null ? element.company_address : '',
              'company_country': element.company_country !== null ? element.company_country : '',
              'company_email': element.company_email !== null ? element.company_email : '',
              'company_city': element.company_city !== null ? element.company_city : '',
              'company_id': element.company_id !== null ? element.company_id : '',
              'payment_date': element.payment_date !== null ? element.payment_date : '',
              'stripeCustomerId': element.stripeCustomerId !== null ? element.stripeCustomerId : ''
            })
          })
          break;
        case 'plus':
          data.map((element: any, index: number) => {
            newData.push({
              'company_name': element.company_name !== null ? element.company_name : '',
              'company_address': element.company_address !== null ? element.company_address : '',
              'company_country': element.company_country !== null ? element.company_country : '',
              'company_email': element.company_email !== null ? element.company_email : '',
              'company_city': element.company_city !== null ? element.company_city : '',
              'coupon': element.coupon !== null ? element.coupon : '',
              'company_id': element.company_id !== null ? element.company_id : '',
              'payment_date': element.payment_date !== null ? element.payment_date : '',
              'stripeCustomerId': element.stripeCustomerId !== null ? element.stripeCustomerId : ''
            })
          })
          break;
        case 'companies':
          data.map((element: any, index: number) => {
            newData.push({
              'name': element.name !== null ? element.name : '',
              'address1': element.address1 !== null ? element.address1 : '',
              'address2': element.address2 !== null ? element.address2 : '',
              'city': element.city !== null ? element.city : '',
              'state': element.state !== null ? element.state : '',
              'postalCode': element.postalCode !== null ? element.postalCode : '',
              'country':element.country !== null ? element.country : '',
              'phone': element.phone !== null ? element.phone : '',
              'website': element.website !== null ? element.website : '',
              'tagline': element.tagline !== null ? element.tagline : '',
              'yearFounded': element.yearFounded !== null ? element.yearFounded : '',
              'createdAt': element.createdAt !== null ? element.createdAt : '',
              'email': element.email !== null ? element.email : ''
            })
          })
          break;
        default:

          break;
      }
    }

    const header = props.location.state.tbltitle;

    XlsxPopulate.fromBlankAsync().then(async (workbook: any) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(newData, header);
      const totalColumns = sheetData[0].length;
      sheet1.cell('A1').value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style('bold', true);
      sheet1.range(`A1:${endColumn}1`).style('fill', 'BFBFBF');
      range.style('border', true);
      return workbook.outputAsync().then((res: any) => {
        saveAs(res,type+'.xlsx');
      });
    });
  }

  useEffect(() => {
    props.getClaims({
      date: props.location.state.date,
      key: props.location.state.type
    });
  }, []);

  useEffect(() => {
    if (type === 'users') {
      setData(props.getClaimData.users)
    } else if (type === 'reviews') {
      setData(props.getClaimData.reviews)
    } else if (type === 'claims') {
      setData(props.getClaimData.claims)
    } else if (type === 'free') {
      setData(props.getClaimData.free)
    } else if (type === 'basic') {
      setData(props.getClaimData.basic)
    } else if (type === 'plus') {
      setData(props.getClaimData.plus)
    } else if (type === 'companies') {
      setData(props.getClaimData.companies)
    }

  }, [props.getClaimData]);


  return (
    <>

      {/* BEGIN: Content */}
      <div className="app-content content">
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper">
          <div className="content-body">
            {/* Description  */}
            <section id="description" className="card">
              <div className="card-header d-flex justify-content-between">
                <h4 className="card-title">Hindsyght {type} Traction Report ({props.location.state.sDate} - {props.location.state.eDate})</h4>
                <button onClick={saveAsExcel} type="button" className="btn btn-primary waves-effect waves-light">
                    Export Data
                </button>
              </div>
              <div className="card-content">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped w-100 table-min-width">
                      <thead className="thead-dark">
                        <tr>
                          {
                            props.location.state.tbltitle.map((element: any, index: number) =>
                              <th scope="col">{element}</th>)
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {data === undefined ? (<></>) : type === 'users' ? data.map((element: any, index: number) =>
                        (
                          <tr>
                            <td>{element.id !== null ? element.id : ''}</td>
                            <td>{element.firstName !== null ? element.firstName : ''}</td>
                            <td>{element.lastName !== null ? element.lastName : ''}</td>
                            <td>{element.email !== null ? element.email : ''}</td>
                            <td>{element.company !== null ? element.company : ''}</td>
                            <td>{element.title !== null ? element.title : ''}</td>
                            <td>{element.industry !== null ? element.industry : ''}</td>
                            <td>{element.location !== null ? element.location : ''}</td>
                            <td>{element.headline !== null ? element.headline : ''}</td>
                            <td>{element.createdAt !== null ? element.createdAt : ''}</td>
                            <td>{element.verified !== null ? element.verified : ''}</td>
                          </tr>

                        )) : type === 'reviews' ? data.map((element: any, index: number) => (
                          <tr>
                            <td>{element.company_name !== null ? element.company_name : ''}</td>
                            <td>{element.user_name !== null ? element.user_name : ''}</td>
                            <td>{element.user_id !== null ? element.user_id : ''}</td>
                            <td>{element.user_email !== null ? element.user_email : ''}</td>
                            <td>{element.review_date !== null ? element.review_date : ''}</td>
                            <td>{element.company_address !== null ? element.company_address : ''}</td>
                            <td>{element.company_country !== null ? element.company_country : ''}</td>
                            <td>{element.company_email !== null ? element.company_email : ''}</td>
                            <td>{element.company_city !== null ? element.company_city : ''}</td>
                            <td>{element.company_id !== null ? element.company_id : ''}</td>
                          </tr>
                        )) : type === 'claims' ? (data || []).map((element: any, index: number) => (
                          <tr>
                            <td>{element.company_name !== null ? element.company_name : ''}</td>
                            <td>{element.user_name !== null ? element.user_name : ''}</td>
                            <td>{element.user_id !== null ? element.user_id : ''}</td>
                            <td>{element.user_email !== null ? element.user_email : ''}</td>
                            <td>{element.claim_date !== null ? element.claim_date : ''}</td>
                            <td>{element.company_address !== null ? element.company_address : ''}</td>
                            <td>{element.company_country !== null ? element.company_country : ''}</td>
                            <td>{element.company_email !== null ? element.company_email : ''}</td>
                            <td>{element.company_city !== null ? element.company_city : ''}</td>
                            <td>{element.company_id !== null ? element.company_id : ''}</td>
                          </tr>
                        )
                        ) : type === 'free' ? (data || []).map((element: any, index: number) => (
                          <tr>
                            <td>{element.company_name !== null ? element.company_name : ''}</td>
                            <td>{element.company_address !== null ? element.company_address : ''}</td>
                            <td>{element.company_country !== null ? element.company_country : ''}</td>
                            <td>{element.company_email !== null ? element.company_email : ''}</td>
                            <td>{element.company_city !== null ? element.company_city : ''}</td>
                            <td>{element.company_id !== null ? element.company_id : ''}</td>
                            <td>{element.payment_date !== null ? element.payment_date : ''}</td>
                            <td>{element.stripeCustomerId !== null ? element.stripeCustomerId : ''}</td>
                          </tr>)) : type === 'basic' ? (data || []).map((element: any, index: number) => (
                            <tr>
                              <td>{element.company_name !== null ? element.company_name : ''}</td>
                              <td>{element.company_address !== null ? element.company_address : ''}</td>
                              <td>{element.company_country !== null ? element.company_country : ''}</td>
                              <td>{element.company_email !== null ? element.company_email : ''}</td>
                              <td>{element.company_city !== null ? element.company_city : ''}</td>
                              <td>{element.coupon !== null ? element.coupon : ''}</td>
                              <td>{element.company_id !== null ? element.company_id : ''}</td>
                              <td>{element.payment_date !== null ? element.payment_date : ''}</td>
                              <td>{element.stripeCustomerId !== null ? element.stripeCustomerId : ''}</td>
                            </tr>)) : type === 'plus' ? (data || []).map((element: any, index: number) => (
                              <tr>
                                <td>{element.company_name !== null ? element.company_name : ''}</td>
                                <td>{element.company_address !== null ? element.company_address : ''}</td>
                                <td>{element.company_country !== null ? element.company_country : ''}</td>
                                <td>{element.company_email !== null ? element.company_email : ''}</td>
                                <td>{element.company_city !== null ? element.company_city : ''}</td>
                                <td>{element.company_id !== null ? element.company_id : ''}</td>
                                <td>{element.payment_date !== null ? element.payment_date : ''}</td>
                                <td>{element.stripeCustomerId !== null ? element.stripeCustomerId : ''}</td>
                              </tr>)) : type === 'companies' ? (data || []).map((element: any, index: number) => (
                                <tr>
                                  <td>{element.name !== null ? element.name : ''}</td>
                                  <td>{element.address1 !== null ? element.address1 : ''}</td>
                                  <td>{element.address2 !== null ? element.address2 : ''}</td>
                                  <td>{element.city !== null ? element.city : ''}</td>
                                  <td>{element.state !== null ? element.state : ''}</td>
                                  <td>{element.postalCode !== null ? element.postalCode : ''}</td>
                                  <td>{element.country !== null ? element.country : ''}</td>
                                  <td>{element.phone !== null ? element.phone : ''}</td>
                                  <td>{element.website !== null ? element.website : ''}</td>
                                  <td>{element.tagline !== null ? element.tagline : ''}</td>
                                  <td>{element.yearFounded !== null ? element.yearFounded : ''}</td>
                                  <td>{element.createdAt !== null ? element.createdAt : ''}</td>
                                  <td>{element.email !== null ? element.email : ''}</td>
                                </tr>)) : (<></>)
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
            {/* Description  */}
          </div>
        </div>
      </div>

      {/* END: Content */}
    </>
  );

}


const mapDispatchToProps = (dispatch: Dispatch) => ({
  getClaims: (params: any) => dispatch(getClaims(params)),
});

const mapStateToProps = (state: ApplicationState) => {
  const data = state.claims.getClaim;
  console.log('data>>>', data);

  return {
    getClaimData: state.claims.getClaim,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Claims);
