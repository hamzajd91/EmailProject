import React from 'react';
import { Avtar } from '../../admin/assets/images';
import { TOKEN, USER_DATA } from '../../utils/ConstantsFile';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import StorageService from '../../services/StorageService';

const obj:any = StorageService.getUser();
const Header = () => (
  <>
    <div>
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <nav className="header-navbar navbar-expand-lg navbar navbar-with-menu floating-nav navbar-light navbar-shadow">
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div className="navbar-collapse" id="navbar-mobile">

              <ul className="nav navbar-nav ml-auto">
                <li>
                  <Dropdown as={ButtonGroup} drop={"down"}>
                    <Dropdown.Toggle className="nav-link p-0" variant="link" id="dropdown-basic">
                      <a className="nav-link dropdown-user-link">
                        <div className="user-nav d-sm-flex d-none">
                          <span className="user-name text-bold-600">{obj.firstName + " " + obj.lastName}</span>
                          <span className="user-status">Available</span>
                        </div>
                        <span>
                          <img className="round" src={obj.picture ? obj.picture : Avtar} alt="avatar" height="40" width="40" />
                        </span>
                      </a>
                    </Dropdown.Toggle>


                    <div style={{ top: "100%", position: "absolute" }}>
                      <Dropdown.Menu >

                        <Dropdown.Item href="/admin" onClick={() => {
                           StorageService.clearLogin()
                         }}>
                          <i className="feather icon-power" /> Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </div>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <ul className="main-search-list-defaultlist d-none">
        <li className="d-flex align-items-center">
          <a className="pb-25" href="#">
            <h6 className="text-primary mb-0">Files</h6>
          </a>
        </li>
        <li className="auto-suggestion d-flex align-items-center cursor-pointer">
          <a className="d-flex align-items-center justify-content-between w-100" href="#">
            <div className="d-flex">
              <div className="mr-50">
                <img src="../app-assets/images/icons/xls.png" alt="png" height="32" />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Two new item submitted</p>
                <small className="text-muted">Marketing Manager</small>
              </div>
            </div>
            <small className="search-data-size mr-50 text-muted">&apos;17kb</small>
          </a>
        </li>
        <li className="auto-suggestion d-flex align-items-center cursor-pointer">
          <a className="d-flex align-items-center justify-content-between w-100" href="#">
            <div className="d-flex">
              <div className="mr-50">
                <img src="../app-assets/images/icons/jpg.png" alt="png" height="32" />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">52 JPG file Generated</p>
                <small className="text-muted">FontEnd Developer</small>
              </div>
            </div>
            <small className="search-data-size mr-50 text-muted">&apos;11kb</small>
          </a>
        </li>
        <li className="auto-suggestion d-flex align-items-center cursor-pointer">
          <a className="d-flex align-items-center justify-content-between w-100" href="#">
            <div className="d-flex">
              <div className="mr-50">
                <img src="../app-assets/images/icons/pdf.png" alt="png" height="32" />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">25 PDF File Uploaded</p>
                <small className="text-muted">Digital Marketing Manager</small>
              </div>
            </div>
            <small className="search-data-size mr-50 text-muted">&apos;150kb</small>
          </a>
        </li>
        <li className="auto-suggestion d-flex align-items-center cursor-pointer">
          <a className="d-flex align-items-center justify-content-between w-100" href="#">
            <div className="d-flex">
              <div className="mr-50">
                <img src="../app-assets/images/icons/doc.png" alt="png" height="32" />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Anna_Strong.doc</p>
                <small className="text-muted">Web Designer</small>
              </div>
            </div>
            <small className="search-data-size mr-50 text-muted">&apos;256kb</small>
          </a>
        </li>
        <li className="d-flex align-items-center">
          <a className="pb-25" href="#">
            <h6 className="text-primary mb-0">Members</h6>
          </a>
        </li>
        <li className="auto-suggestion d-flex align-items-center cursor-pointer">
          <a className="d-flex align-items-center justify-content-between py-50 w-100" href="#">
            <div className="d-flex align-items-center">
              <div className="avatar mr-50">
                <img src={Avtar} alt="png" height="32" />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">John Doe</p>
                <small className="text-muted">UI designer</small>
              </div>
            </div>
          </a>
        </li>
        <li className="auto-suggestion d-flex align-items-center cursor-pointer">
          <a className="d-flex align-items-center justify-content-between py-50 w-100" href="#">
            <div className="d-flex align-items-center">
              <div className="avatar mr-50">
                <img src="../app-assets/images/portrait/small/avatar-s-1.jpg" alt="png" height="32" />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Michal Clark</p>
                <small className="text-muted">FontEnd Developer</small>
              </div>
            </div>
          </a>
        </li>
        <li className="auto-suggestion d-flex align-items-center cursor-pointer">
          <a className="d-flex align-items-center justify-content-between py-50 w-100" href="#">
            <div className="d-flex align-items-center">
              <div className="avatar mr-50">
                <img src="../app-assets/images/portrait/small/avatar-s-14.jpg" alt="png" height="32" />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Milena Gibson</p>
                <small className="text-muted">Digital Marketing Manager</small>
              </div>
            </div>
          </a>
        </li>
        <li className="auto-suggestion d-flex align-items-center cursor-pointer">
          <a className="d-flex align-items-center justify-content-between py-50 w-100" href="#">
            <div className="d-flex align-items-center">
              <div className="avatar mr-50">
                <img src="../app-assets/images/portrait/small/avatar-s-6.jpg" alt="png" height="32" />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Anna Strong</p>
                <small className="text-muted">Web Designer</small>
              </div>
            </div>
          </a>
        </li>
      </ul>
      <ul className="main-search-list-defaultlist-other-list d-none">
        <li className="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer">
          <a className="d-flex align-items-center justify-content-between w-100 py-50">
            <div className="d-flex justify-content-start">
              <span className="mr-75 feather icon-alert-circle" />
              <span>No results found.</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </>
);

export default Header;
