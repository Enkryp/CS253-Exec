import GBMProfile from "components/GBM/GBMProfile.js";
import CampaignTables from 'components/GBM/CampaignRequestTable.js';
import MainDashboard from "components/Dashboard/MainDashboard";
import NominationApplicationForm from "components/GBM/NominationApplicationForm";
import ViewForms from "components/GBM/ViewForms";
var gbm_routes = [
  {
    path: "/gbm/dashboard",
    name: "GBM Dashboard",
    icon: "ni ni-single-02 text-yellow",
    component: MainDashboard,
    layout: "/ouradmin",
  },
  {
    path: "/gbm/profile",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: GBMProfile,
    layout: "/ouradmin",
  },
   {
    path: "/gbm/campaign-request",
    name: "Campaign Request",
    icon: "ni ni-single-02 text-yellow",
    component: CampaignTables,
    layout: "/ouradmin",
  },
  {
    path: "/gbm/nomination",
    name: "Candidate Nomination Application Form",
    icon: "ni ni-single-02 text-yellow",
    component: NominationApplicationForm,
    layout: "/ouradmin",
  },
  {
    path: "/gbm/view-forms",
    name: "View Forms",
    icon: "ni ni-single-02 text-yellow",
    component: ViewForms,
    layout: "/ouradmin",
  }
];
export default gbm_routes;