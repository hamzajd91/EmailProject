import React, {useEffect, useState, Suspense} from "react";
import {Helmet} from "react-helmet";
import {Row, Container} from "react-bootstrap";
import {connect} from "react-redux";
import qs from "qs";
import {withRouter} from "react-router-dom";
import {searchCompany, searchOnLoad, setPageOnLoad} from "../../store/ducks/companies/actions";
import Filters from "./Filters";
import CompaniesList from "./CompaniesList";
import SearchComponent from "./SearchComponent";
import {Loader} from "../Loader";
import ProficiencyHeader from "./StaticPages/Components/ProficiencyHeader";
import "./index.scss";

// Import static pages
const OracleConsulting = React.lazy(() => import("./StaticPages/OracleConsulting"));
const IntelligenceConsulting = React.lazy(() => import("./StaticPages/IntelligenceConsulting"));
const SAPConsulting = React.lazy(() => import("./StaticPages/SAPConsulting"));
const DotnetDeveloper = React.lazy(() => import("./StaticPages/DotnetDeveloper"));
const DataProcessing = React.lazy(() => import("./StaticPages/DataProcessing"));
const CyberSecurity = React.lazy(() => import("./StaticPages/CyberSecurity"));
const CRM = React.lazy(() => import("./StaticPages/CRM"));
const AgileFrameworkConsulting = React.lazy(() => import("./StaticPages/AgileFrameworkConsulting"));

interface DispatchProps {
  searchCompany(params: any): void;
  searchOnLoad(params: any): void;
  setPageOnLoad(params: any): void;
}

interface Props {
  location: any;
  companyResponse: any;
  history: any;
  _location: any;
  companies: any;
  error: any;
  activePage: any;
  match: any;
  writeReview?: boolean;
}

type AllProps = DispatchProps & Props;

function ProficiencySearch({
  location,
  searchOnLoad,
  setPageOnLoad,
  companyResponse,
  history,
  companies,
  error,
  _location,
  activePage,
  writeReview,
  match,
}: AllProps) {
  // @ts-ignore
  const [showProfile, setShowProfile] = useState(false);
  const [queryParam, setQueryParam] = useState("");
  const [locationParam, setLocationParam] = useState("");
  const [proficiencyName, setProficiencyName] = useState("");
  const [proficiencyComponent, setProficiencyComponent]: any = useState(null);
  const [otherkeywords, setOtherkeywords]: any = useState([]);

  useEffect(() => {
    const query = qs.parse(location.search, {ignoreQueryPrefix: true}) as any;
    handleSearch(query.page);
    staticPageComponent();
    setPageOnLoad({activePage: query.page});
  }, [window.location.href]);

  useEffect(() => {
    if (writeReview) {
      return setLocationParam(_location);
    }
    const query = qs.parse(location.search, {ignoreQueryPrefix: true}) as any;
    if (!query.page) {
      history.push({
        pathname: `/proficiency/${match.params.slug}`,
        search: `?location=${query.location || _location}&page=1`,
      });
    }
    if (activePage == "") {
      history.push({
        pathname: `/proficiency/${match.params.slug}`,
        search: `?location=${query.location || _location}&page=1`,
      });
    }
  }, [activePage, _location]);

  function handleSearch(page: any) {
    const query = qs.parse(location.search, {ignoreQueryPrefix: true}) as any;
    const proficiency = match.params.slug.replace("-", " ");
    query["q"] = proficiency.replace(/\b\w/g, (l: string) => l.toUpperCase());
    setQueryParam(query.q);
    setLocationParam(query.location);
    const params = {
      query: query.q,
      location: query.location,
      distance: companyResponse.currentDistance || 3000,
      page: parseInt(page, 10),
      sortFilters: companyResponse.sort,
      filters: companyResponse.currentFilters
        ? {
            p: companyResponse.currentFilters.proficiencies,
            s: companyResponse.currentFilters.scores,
            i: companyResponse.currentFilters.industries,
          }
        : {p: [], s: [], i: []},
    };
    searchOnLoad(params);
    window.scrollTo(0, 0);
  }

  function staticPageComponent() {
    let _otherkeywords: any = [];
    switch (match.params.slug) {
      case "oracle-consulting":
        setProficiencyName("Oracle Consulting");
        setProficiencyComponent(<OracleConsulting keyword="Oracle Consulting" />);
        break;

      case "business-intelligence":
        _otherkeywords = [
          {name: "Business Warehouse", link: true},
          {name: "Business Warehouse Consulting", link: true},
        ];
        setProficiencyName("Business Intelligence");
        setProficiencyComponent(<IntelligenceConsulting keyword="Business Intelligence" />);
        break;

      case "automated-software-testing":
        _otherkeywords = [
          {name: "Software Test Automation", link: true},
          {name: "Automated software testing tools", link: true},
          {name: "Automated Software Testing Tools Comparison", link: true},
        ];
        setProficiencyName("Automated Software Testing");
        break;

      case "aws-consulting":
        _otherkeywords = [
          {name: "Amazon Web Services", link: true},
          {name: "Amazon Web Services Consulting", link: true},
        ];
        setProficiencyName("AWS Consulting");
        break;

      case "azure-consulting":
        _otherkeywords = [{name: "Microsoft Azure - Computer Application", link: true}];
        setProficiencyName("Azure Consulting");
        break;

      case "bi-software":
        _otherkeywords = [
          {name: "Business Intelligence", link: true},
          {name: "Business Warehouse", link: true},
          {name: "Business Warehouse Consulting", link: true},
        ];
        setProficiencyName("BI Software");
        break;

      case "cad-autodesk":
        _otherkeywords = [
          {name: "Computer Aid Design", link: true},
          {name: "Autodesk", link: true},
        ];
        setProficiencyName("CAD - Autodesk");
        break;

      case "erp":
        _otherkeywords = [
          {name: "Enterprise Resource Planning", link: true},
          {name: "ERP Consulting", link: true},
          {name: "ERP - Sage Consulting", link: true},
          {name: "ERP - Oracle Peoplesoft", link: true},
          {name: "ERP - Netsuite Consulting", link: true},
          {name: "ERP - Microsoft Dynamics", link: true},
          {name: "ERP - SAP HANA Consulting", link: true},
          {name: "ERP -Oracle Consulting", link: true},
          {name: "ERP - SAP Consulting", link: true},
          {name: "ERP - Oracle Consulting", link: true},
        ];
        setProficiencyName("ERP");
        break;

      case "hcm":
        _otherkeywords = [
          {name: "Human Capital Management", link: true},
          {name: "Human Resources Consulting", link: true},
          {name: "HR Consulting", link: true},
        ];
        setProficiencyName("HCM");
        break;

      case "jenkins":
        _otherkeywords = [{name: "Jenkins Testing Tool", link: true}];
        setProficiencyName("Jenkins");
        break;

      case "juniper-consulting":
        _otherkeywords = [{name: "Juniper Networks", link: true}];
        setProficiencyName("Juniper Consulting");
        break;

      case "mas-90":
        _otherkeywords = [{name: "MAS 90 Accounting", link: true}];
        setProficiencyName("MAS 90");
        break;

      case "mobile-app-development-ios":
        _otherkeywords = [
          {name: "Mobile App Development - Android", link: true},
          {name: "Mobile App Development", link: true},
        ];
        setProficiencyName("Mobile App Development IOS");
        break;

      case "office-365-consulting":
        _otherkeywords = [
          {name: "Microsoft Office 364", link: true},
          {name: "Microsoft Office 364 Consulting", link: true},
        ];
        setProficiencyName("Office 365 Consulting");
        break;

      case "quickbooks":
        _otherkeywords = [
          {name: "Quickbooks Online", link: true},
          {name: "Quickbooks desktop", link: true},
          {name: "Quickbooks pro", link: true},
          {name: "Quickbooks consulting", link: true},
        ];
        setProficiencyName("Quickbooks");
        break;

      case "soc2":
        _otherkeywords = [
          {name: "SOC 2 Certification", link: true},
          {name: "SOC Audit", link: true},
          {name: "Security Operations Center", link: true},
        ];
        setProficiencyName("SOC2");
        break;

      case "systems-engineers":
        _otherkeywords = [
          {name: "Systems Integrator", link: true},
          {name: "Project Management", link: true},
        ];
        setProficiencyName("Systems Engineers");
        break;

      case "avaya-consulting":
        _otherkeywords = [
          {name: "Telecommunications Consultants", link: true},
          {name: "Avaya Consulting", link: true},
          {name: "Telecom - Avaya Consulting", link: true},
        ];
        setProficiencyName("Avaya Consulting");
        break;

      case "web-development":
        _otherkeywords = [
          {name: "Web Development - Wordpress", link: true},
          {name: "Website Design Services", link: true},
          {name: "Website UX/UI Design", link: true},
          {name: "Web Design and Web Development", link: true},
          {name: "Website Localization", link: true},
          {name: "Web Development Consulting", link: true},
          {name: "Java Developer", link: true},
          {name: "JavaScript Developer", link: true},
          {name: "React Developer", link: true},
          {name: "Dual Stack Developer", link: true},
          {name: "Web Front End Developer", link: true},
          {name: "Web Backend Developer", link: true},
          {name: "Web Development Consulting", link: true},
        ];
        setProficiencyName("Web Development");
        break;

      case "management-consulting-services":
        _otherkeywords = [{name: "Business Consulting Services", link: true}];
        setProficiencyName("Management Consulting Services");
        break;

      case "computer-systems-analysis-and-design":
        _otherkeywords = [
          {name: "Cloud Services", link: true},
          {name: "Cloud Migration", link: true},
          {name: "Cloud Computing", link: true},
        ];
        setProficiencyName("Computer Systems Analysis and Design");
        break;

      case "sap-consulting":
        _otherkeywords = [
          {
            name: "ERP & Finance",
            link: false,
            sub: [
              {
                name: "SAP S/4HANA",
                link: false,
                sub: [
                  {name: "Sales & Distribution", link: true},
                  {name: "Order To Cash", link: true},
                  {name: "Material Management", link: true},
                  {name: "Warehouse Management", link: true},
                  {name: "Inventory Management", link: true},
                  {name: "Procure to Pay", link: true},
                  {name: "Product Management", link: true},
                  {name: "Product Lifecycle Management", link: true},
                ],
              },
              {
                name: "ERP for Small and Midsize Enterprises",
                link: true,
              },
              {
                name: "Financial Planning and Analysis",
                link: true,
              },
              {
                name: "Accounting and Financial Close",
                link: true,
              },
              {
                name: "Treasury Management",
                link: true,
              },
              {
                name: "Accounts Receivable, Billing and Revenue Management",
                link: true,
              },
              {
                name: "Cybersecurity, Governance, Risk and Compliance",
                link: true,
              },
            ],
          },
          {
            name: "CRM and Customer Experience",
            link: false,
            sub: [
              {name: "SAP C/4HANA", link: true},
              {name: "Customer Data", link: true},
              {name: "Marketing", link: true},
              {name: "Commerce", link: true},
              {name: "Sales", link: true},
              {name: "Service", link: true},
            ],
          },
          {
            name: "Network and Spend Management",
            link: false,
            sub: [
              {name: "Supplier Management", link: true},
              {name: "Strategic Sourcing", link: true},
              {name: "Procurement", link: true},
              {
                name: "Services Procurement and External Workforce",
                link: true,
              },
              {name: "Selling and Fulfillment", link: true},
              {name: "Travel and Expense", link: true},
            ],
          },
          {
            name: "Digital Supply Chain",
            link: false,
            sub: [
              {name: "Supply Chain Planning", link: true},
              {name: "Supply Chain Logistics", link: true},
              {name: "Manufacturing", link: true},
              {name: "R&D / Engineering", link: true},
              {name: "Asset Management", link: true},
            ],
          },
          {
            name: "HR and People Engagement",
            link: false,
            sub: [
              {name: "Employee Experience Management", link: true},
              {name: "Core HR and Payroll", link: true},
              {name: "Talent Management", link: true},
              {
                name: "HR Analytics and Workforce Planning",
                link: true,
              },
            ],
          },
          {
            name: "Business Technology Platform",
            link: false,
            sub: [
              {name: "Database and Data Management", link: true},
              {
                name: "Application Development and integration",
                link: true,
              },
              {name: "Analytics", link: true},
              {
                name: "Intelligent Technologies",
                link: true,
              },
            ],
          },
        ];

        setProficiencyName("SAP Consulting");
        setProficiencyComponent(<SAPConsulting keyword="SAP Consulting" />);
        break;

      case "dotnet-developer":
        setProficiencyName("Dotnet Developer");
        setProficiencyComponent(<DotnetDeveloper keyword="Dotnet Developer" />);
        break;

      case "data-processing":
        _otherkeywords = [
          {name: "Data Processing Services", link: true},
          {name: "Data Communication Services", link: true},
          {
            name: "Data Communication System Networks",
            link: true,
          },
        ];
        setProficiencyName("Data Processing");
        setProficiencyComponent(<DataProcessing keyword="Data Processing" />);
        break;

      case "cybersecurity":
        _otherkeywords = [
          {name: "Cybersecurity", link: true},
          {
            name: "Cybersecurity - Palo Alto Firewall",
            link: true,
          },
          {name: "Infosec -Infromation Security", link: true},
          {
            name: "AB375",
            link: true,
          },
          {
            name: "GDPR",
            link: true,
          },
          {name: "CA Data Security", link: true},
          {name: "EU Data Security", link: true},
          {name: "European Union Data Security", link: true},
          {name: "European Union GDPR", link: true},
          {name: "Data Security Regulation", link: true},
          {name: "California Data Security Law", link: true},
          {name: "California Consumer Privacy Act", link: true},
          {
            name: "General Data Protection Regulation",
            link: true,
          },
          {name: "PII", link: true},
          {
            name: "Personal Identifiable Information",
            link: true,
          },
          {name: "Data Privacy", link: true},
          {name: "Audit & Compliance", link: true},
          {name: "Information Privacy", link: true},
          {
            name: "Information Regulatory Compliance",
            link: true,
          },
          {name: "Information privacy", link: true},
          {name: "CCPA", link: true},
          {name: "Data Privacy Laws by State", link: true},
        ];
        setProficiencyName("Cybersecurity");
        setProficiencyComponent(<CyberSecurity keyword="Cybersecurity" />);
        break;

      case "crm":
        _otherkeywords = [
          {name: "CRM", link: true},
          {name: "CRM - Salesforce Consulting", link: true},
          {name: "CRM Consulting", link: true},
          {name: "SAP CRM Suites", link: true},
          {name: "CRM Salesforce.com", link: true},
          {name: "SFDC", link: true},
          {name: "Customer Relationship Management", link: true},
          {name: "Microsoft Dynamics CRM", link: true},
        ];
        setProficiencyName("CRM");
        setProficiencyComponent(<CRM keyword="CRM" />);

        break;

      case "agile-framework-consulting":
        setProficiencyName("Agile Framework Consulting");
        setProficiencyComponent(<AgileFrameworkConsulting keyword="Agile Framework Consulting" />);
        break;

      default:
        // const _proficiency = match.params.slug.replace("-", " ");
        const _proficiency = match.params.slug.split("-").join(" ");
        const _proficiencyName = _proficiency.replace(/\b\w/g, (l: string) => l.toUpperCase());
        setProficiencyName(_proficiencyName);
        setProficiencyComponent(null);
        break;
    }
    setOtherkeywords(_otherkeywords);
  }

  return (
    <>
      <Helmet>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <title>Hire the best {proficiencyName} | Hindsyght</title>
        <meta name="title" content={`Hire the best ${proficiencyName} | Hindsyght`} />
        <meta property="og:title" content={`Hire the best ${proficiencyName} | Hindsyght`} />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta
          name="description"
          content={`Find a trusted ${proficiencyName} firm using Hindsyght - the leading B2B platform connecting small and medium-sized businesses to IT consulting companies. We make it easy for you to choose the best local IT services company to partner with”. Replace the smaller fonts text below.`}
        />
        <meta
          property="og:description"
          content={`Find a trusted ${proficiencyName} firm using Hindsyght - the leading B2B platform connecting small and medium-sized businesses to IT consulting companies. We make it easy for you to choose the best local IT services company to partner with”. Replace the smaller fonts text below.`}
        />
      </Helmet>
      <div className="proficiency_statics">
        <ProficiencyHeader otherkeywords={otherkeywords} keyword={proficiencyName} />
      </div>
      <div className="hs-search-and-profile">
        <div className="search_box_bg">
          <Container>
            <Row>
              <SearchComponent
                classess="search-page"
                error={error}
                searchCompany={searchOnLoad}
                locationQuery={locationParam}
                query={queryParam}
                setShowProfile={setShowProfile}
              />
            </Row>
          </Container>
        </div>

        <Filters />

        <CompaniesList history={history} match={match} setShowProfile={setShowProfile} />
      </div>
      <hr className="mb-0 mt-5" />
      <Suspense fallback={<Loader />}>{proficiencyComponent}</Suspense>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    error: state.companies.error,
    companyResponse: state.companies.searchResponse,
    distance: state.companies.distance,
    query: state.companies.query,
    locationQ: state.companies.location,
    companies: state.companies.companiesData,
    filters: state.companies.filters,
    activePage: state.companies.activePage,
    _location: state.location.location,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  searchCompany: (params: any) => dispatch(searchCompany(params)),
  searchOnLoad: (params: any) => dispatch(searchOnLoad(params)),
  setPageOnLoad: (params: any) => dispatch(setPageOnLoad(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProficiencySearch));
