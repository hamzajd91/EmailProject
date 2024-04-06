import React, {useEffect} from "react";
import appApi from "../../../services/appApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import XLSX from "xlsx";
import moment from "moment";

function ExcelExport(props: any) {
  const {export_data, exportModalHandler} = props;
  useEffect(() => {
    getData();
  }, [export_data]);

  const getData = async () => {
    try {
      const {data} = await appApi.get(
        `/analytics/data/${export_data.companyId}/${export_data.start_date}/${export_data.end_date}`
      );

      const wb = XLSX.utils.book_new();

      // For Search Terms used for search
      const number_of_times_search_appear = data.number_of_times_search_appear.reduce((pv: any, cv: any) => {
        const _info = cv.searchTerms.reduce((_pv: any, _cv: any) => {
          _pv.push(cv.createdAt);
          _pv.push(_cv.searchTerm);
          _pv.push(_cv.counts);
          return _pv;
        }, []);
        pv.push(_info);
        return pv;
      }, []);
      const search_appear_sheet = XLSX.utils.aoa_to_sheet([
        ["Date", "Search Terms used for search", "Counts"],
        ...number_of_times_search_appear,
      ]);

      // For company bookmarks
      const companyProfileBookmarks = data.companyProfileBookmarks.reduce((pv: any, cv: any) => {
        pv.push([moment(cv.createdAt).format("YYYY-MM-DD"), cv.firstName, cv.lastName]);
        return pv;
      }, []);

      const company_profile_bookmarks_sheet = XLSX.utils.aoa_to_sheet([
        ["Date", "First Name", "Last Name"],
        ...companyProfileBookmarks,
      ]);

      // For company profile views
      const companyProfileViews: any = [];
      for (let index = 0; index < data.companyProfileViews.length; index++) {
        const cv = data.companyProfileViews[index];
        for (let index = 0; index < cv.data.length; index++) {
          const element = cv.data[index];
          companyProfileViews.push([cv.createdAt, element.firstName, element.lastName, element.counts]);
        }
      }

      const company_profile_views_sheet = XLSX.utils.aoa_to_sheet([
        ["Date", "First Name", "Last Name", "Counts"],
        ...companyProfileViews,
      ]);

      XLSX.utils.book_append_sheet(wb, search_appear_sheet, `Search Terms used for search`);
      XLSX.utils.book_append_sheet(wb, company_profile_views_sheet, `Company Views`);
      XLSX.utils.book_append_sheet(wb, company_profile_bookmarks_sheet, `Company Bookmarks`);
      XLSX.writeFile(wb, `${moment().format("DD-MM-YYYY_h-hh")}_DATA.xlsx`);
      exportModalHandler();
    } catch (error) {
      exportModalHandler();
      console.log(error);
    }
  };

  return (
    <div className="text-center">
      <CircularProgress />
      <p className="mb-2">Please wait...</p>
    </div>
  );
}

export default ExcelExport;
