import React, { useEffect,useState,useRef} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addCompany, getCountry, getIndustries, getProficiencies } from '../../store/ducks/addFirms/actions';
import { ApplicationState } from '../../store';
import {Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { Form } from 'react-bootstrap';
import Loading from '../../admin/assets/images/Loading';
import { updateAdminCompany,setupdateCompany,getCompanyDetail } from './../../store/ducks/addFirms/actions';
import { useNavigate } from "react-router-dom";
type Props = any;

const tempArrayCountry: { key: any; value: any; }[] = [];

const EditFirm = (props: Props) => {
  let history = useNavigate();
  let isUpdate = false;
  const dropDown = useRef('');
  const [dataItem, setDataItem] = useState(props.location.state.data)

  const [dataIndustry, setDataIndustry] = useState('')
        
  useEffect(() => {
    props.getCompanyDetail({['id']:dataItem.id});
    props.getCountry();
    props.getIndustries();
    props.getProficiencies();
    console.log(dataItem)
  }, []);

  useEffect(() => {
    if (props.updateCompanyData.id !== undefined ) {
      isUpdate = true;
      history.push("/admin/firms");
      props.setupdateCompany();
    }
  }, [props.updateCompanyData]);

  useEffect(() => {
    setDataIndustry(props.getCompanyDetailData !== undefined ? props.getCompanyDetailData.industries.length>0 ? props.getCompanyDetailData.industries[0].name:'' :'')
    //console.log('industryData>>>>>>>', props.getCompanyDetailData !== undefined ? props.getCompanyDetailData.industries.length>0 ? props.getCompanyDetailData.industries[0].name:'' :'');
    dropDown.current=props.getCompanyDetailData !== undefined ? props.getCompanyDetailData.industries.length>0 ? props.getCompanyDetailData.industries[0].name:'' :''
    console.log('data>>>>>>>',dropDown.current)
  }, [props.getCompanyDetailData]);

  return (
    <Formik
      initialValues={{
        id:dataItem.id,
        name: dataItem.name,
        website: dataItem.website,
        industry:dataIndustry, 
        email: dataItem.email,
        address1: dataItem.address1,
        address2: dataItem.address2,
        year_founded:dataItem.yearFounded===null?'':dataItem.yearFounded,
        proficiencies: dataItem.proficiencies[0],
        country: dataItem.country,
        state: dataItem.state,
        city: dataItem.city,
        postalCode: dataItem.postalCode,
        phone: dataItem.phone,
        location_contact: "",
        contact_respresentive: "",
        fb_url: dataItem.social.fb!==undefined ? dataItem.social.fb :'',
        linkedin_url: dataItem.social.linkedin!==undefined ? dataItem.social.linkedin:'',
        twitter_url: dataItem.social.twitter!==undefined ? dataItem.social.twitter:'',
        youtube_url:dataItem.social.youtube!==undefined ? dataItem.social.youtube:'',
        decription:dataItem.tagline===null?'':dataItem.tagline
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Company name is required"),
        website: Yup.string().required("Company website is required"),
        industry: Yup.string().required("Company industry is required"),
        address1: Yup.string().required("Company address is required"),
        year_founded:Yup.string().required("Company year founded is required"),
        proficiencies: Yup.string().required("Proficiencies is required"),
        city: Yup.string().required("Company city is required"),
        country: Yup.string().required("Company country is required"),
        state: Yup.string().required("Company state is required"),
        postalCode: Yup.string().required("Company postalCode is required"),
        phone: Yup.string().required("Phone number is required")
      })}

      onSubmit={(values, { resetForm }) => {
       
        const result = props.getProficienciesData.find((o: any) => {
          return values.proficiencies === o.name
        }); 

        const industry = props.getIndustriesArray.find((o: any) => {
          return dropDown.current === o.name
        });
        
        const pram = {
          ['companyId']:values.id,
          ['name']: values.name,
          ['address1']: values.address1,
          ['address2']: values.address2,
          ['city']: values.city,
          ['state']: values.state,
          ['postalCode']: values.postalCode,
          ['country']: values.country,
          ['phone']: values.phone,
          ['repName']: '',
          ['repEmail']: '',
          ['website']: values.website,
          ['email']: values.email,
          ['yearFounded']: values.year_founded,
          ['social']: {
            ['fb']: values.fb_url,
            ['linkedin']: values.linkedin_url,
            ['twitter']: values.twitter_url,
            ['youtube']: values.youtube_url
          },
          ['tagline']: values.decription,
          ['proficiency']: '',
          ['industries']:[industry.id],
          ['proficiencies']:[result.id],
          ['perm'] : "admin",
        }
        console.log('id>>>>',values)
        props.updateCompany({id:values.id,data:pram})
      }}
    >
      {({values, errors, status, touched, handleSubmit, setFieldValue}) => (
        <div className="app-content content">
          {props.loading && <Loading />}
          <div className="content-overlay" />
          <div className="header-navbar-shadow" />
          <div className="content-wrapper">

            <Form className="form-horizontal pt-4 pb-5" onSubmit={handleSubmit}>

              <div className="row justify-content-center">

                <div className="col-6">
                  
                  {/* Description  */}
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Edit a Company</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="name">Company Name</label>
                            <Field
                              name="name"
                              type="text"
                              placeholder="Company Name"
                              className={"form-control" + (errors.name && touched.name ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="website">Company Website</label>
                            <Field
                              name="website"
                              type="text"
                              placeholder="Company Website"
                              className={"form-control" + (errors.website && touched.website ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="website" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="industry">Industry</label>
                            <select
                              name="industry"
                              value={dropDown.current} 
                              data-placeholder="Select a industry..."
                              onChange={(event) => {
                                dropDown.current = event.target.value;
                                setFieldValue("industry", dropDown.current)
                              }}
                              className={
                                "select2-icons form-control" +
                                (errors.industry && touched.industry ? " is-invalid" : "")
                              }
                              id="select1-icons"
                            >
                              {props.getIndustriesArray.map((item: any, index: any) => (
                                <>
                                  <option key={index} value={item.name}>
                                    {item.name}
                                  </option>
                                </>
                              ))}
                            </select>
                            <ErrorMessage name="industry" component="div" className="invalid-feedback" />
                          </div>
                        </div>


                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="email">Company general support mail</label>
                            <Field
                              name="email"
                              type="text"
                              placeholder="Company general support mail"
                              className={"form-control"}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="address1">Head quarters address</label>
                            <Field
                              name="address1"
                              type="text"
                              placeholder="Head quarters address"
                              className={"form-control" + (errors.address1 && touched.address1 ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="address1" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="address2">Head quarters address2</label>
                            <Field
                              name="address2"
                              type="text"
                              placeholder="Head quarters address2"
                              className={"form-control"}
                            />
                          </div>
                        </div> 

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="year_founded">Year Founded</label>
                            <Field
                              name="year_founded"
                              type="number"
                              placeholder="Year Founded"
                              className={"form-control" + (errors.year_founded && touched.year_founded ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="year_founded" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="proficiencies">Proficiencies</label>
                            <select
                              value={values.proficiencies}
                              defaultValue={values.proficiencies}
                              name="proficiencies"
                              onChange={option => setFieldValue("proficiencies",option.target.value)}
                              className={
                                "select2 form-control" +
                                (errors.proficiencies && touched.proficiencies ? " is-invalid" : "")
                              }
                            >
                              {(props.getProficienciesData || []).map((item: any, index: any) => (
                                <>
                                  <option value={item.name}>{item.name}</option>
                                </>
                              ))}
                            </select>
                            <ErrorMessage name="proficiencies" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="city">City/Town</label>
                            <Field
                              name="city"
                              type="text"
                              placeholder="City/Town"
                              className={"form-control" + (errors.city && touched.city ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="city" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select
                              name="country"
                              data-placeholder="Select a country..."
                              onChange={option => setFieldValue("country", option.target.value)}
                              className={
                                "select2-icons form-control" + (errors.country && touched.country ? " is-invalid" : "")
                              }
                              id="select2-icons"
                            >
                              {tempArrayCountry.map((item, index) => (
                                <>
                                  <option key={index} value={item.key}>
                                    {item.value}
                                  </option>
                                </>
                              ))}
                            </select>

                            <ErrorMessage name="country" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="state">State/Province/Region</label>
                            <Field
                              name="state"
                              type="text"
                              placeholder="State"
                              className={"form-control" + (errors.state && touched.state ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="state" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="postalCode">Zip Code/Postal Code</label>
                            <Field
                              name="postalCode"
                              type="number"
                              placeholder="Zip Code/Postal Code"
                              className={
                                "form-control" + (errors.postalCode && touched.postalCode ? " is-invalid" : "")
                              }
                            />
                            <ErrorMessage name="postalCode" component="div" className="invalid-feedback" />
                          </div>
                        </div>


                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="phone">Headquaters Phone number</label>
                            <Field
                              name="phone"
                              type="number"
                              placeholder="Headquaters Phone number"
                              className={"form-control" + (errors.phone && touched.phone ? " is-invalid" : "")}
                            />
                            <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                          </div>
                        </div>

                        
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="location_contact_respresentive">Location Contact Respresentive</label>
                            <Field
                              name="location_contact"
                              type="text"
                              placeholder="Location contact respresentive"
                              className={"form-control"}
                            />
                        
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="contact_respresentive">Contact Respresentive</label>
                            <Field
                              name="contact_respresentive"
                              type="text"
                              placeholder="Contact respresentive"
                              className={"form-control"}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="fb_url">Facebook Url</label>
                            <Field
                              name="fb_url"
                              type="text"
                              placeholder="Facebook Url"
                              className={"form-control"}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="linkedin_url">Linkedin Url</label>
                            <Field
                              name="linkedin_url"
                              type="text"
                              placeholder="Linkedin Url"
                              className={"form-control"}
                            />
                          </div>
                        </div>

                        
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="twitter_url">Twitter Url</label>
                            <Field
                              name="twitter_url"
                              type="text"
                              placeholder="Linkedin Url"
                              className={"form-control"}
                            />
                          </div>
                        </div>


                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="youtube_url">Youtube Url</label>
                            <Field
                              name="youtube_url"
                              type="text"
                              placeholder="Youtube Url"
                              className={"form-control"}
                            />
                          </div>
                        </div>

                        
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="decription">Company Description</label>
                            <Field
                              name="decription"
                              type="text"
                              placeholder="Company Description"
                              className={"form-control"}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <button type="submit" className="btn btn-primary mr-1 waves-effect waves-light">
                            Update Company
                          </button>
                        </div>

                      </div>

                    </div>

                  </div>
                
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
  
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCountry: (params: any) => dispatch(getCountry()),
  getIndustries: (params: any) => dispatch(getIndustries()),
  getProficiencies: (params: any) => dispatch(getProficiencies()),
  addCompany: (params: any) => dispatch(addCompany(params)),
  updateCompany: (params: any) => dispatch(updateAdminCompany(params)),
  setupdateCompany: () => dispatch(setupdateCompany()),
  getCompanyDetail:(params: any)=> dispatch(getCompanyDetail(params)),
});

const mapStateToProps = (state: ApplicationState) => {
  const data = state.addFirms.getCountry;

  for (const [key, value] of Object.entries(data)) {
    tempArrayCountry.push({ key, value });
  }

  console.log('data>>>>>>',state.addFirms.getCompanyDetail)
  return {
    loading : state.addFirms.loading,
    getCountry: state.addFirms.getCountry,
    getIndustriesArray: state.addFirms.getIndustries,
    getProficienciesData: state.addFirms.getProficiencies,
    updateCompanyData: state.addFirms.updateAdminCompany,
    getCompanyDetailData: state.addFirms.getCompanyDetail.company,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFirm);
