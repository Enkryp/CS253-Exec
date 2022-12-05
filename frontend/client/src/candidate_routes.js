import CandidateLogin from "components/candidate_authentication/SignIn.js";
import CandidateSignUp from "components/candidate_authentication/SignUp";
import OTPVerification from "components/candidate_authentication/OTPVerification";
import CandidateForgetPassword from "components/candidate_authentication/ForgetPassword.js";
import MainDashboard from "components/Dashboard/MainDashboard";
import CandidateProfile from "components/Candidate/CandidateProfile.js";
import RequestCampaigner from "components/Candidate/RequestCampaigner";
import AddVideos from "components/Candidate/AddVideos";
import AddPoster from "components/Candidate/AddPoster";
import ManageForms from "components/Candidate/ManageForms.js";

var candidate_routes = [
    {
        path: "/candidate/login",
        name: "Candidate Login",
        icon: "ni ni-single-02 text-yellow",
        component: CandidateLogin,
        layout: "/auth",
    },
    {
        path: "/candidate/signup",
        name: "Candidate Signup",
        icon: "ni ni-single-02 text-yellow",
        component: CandidateSignUp,
        layout: "/auth",
    },
    {
        path: "/candidate/otp-verification",
        name: "OTP Verification",
        icon: "ni ni-single-02 text-yellow",
        component: OTPVerification,
        layout: "/auth",
    },
     {
        path: "/candidate/forget",
        name: "Forget Password",
        icon: "ni ni-single-02 text-yellow",
        component: CandidateForgetPassword,
        layout: "/auth",
    },
    {
        path: "/candidate/request-campaigner",
        name: "Request Campaigner",
        icon: "ni ni-single-02 text-yellow",
        component: RequestCampaigner,
        layout: "/ouradmin",
    },
    {
        path: "/candidate/dashboard",
        name: "Candidate Dashboard",
        icon: "ni ni-single-02 text-yellow",
        component: MainDashboard,
        layout: "/ouradmin",
    },
    {
        path: "/candidate/profile",
        name: "My Profile",
        icon: "ni ni-single-02 text-yellow",
        component: CandidateProfile,
        layout: "/ouradmin",
    },
    {
        path: "/candidate/add-videos",
        name: "Add Videos",
        icon: "ni ni-single-02 text-yellow",
        component: AddVideos,
        layout: "/ouradmin",
    },
    {
        path: "/candidate/add-posters",
        name: "Add Poster",
        icon: "ni ni-single-02 text-yellow",
        component: AddPoster,
        layout: "/ouradmin",
    },
    {
        path: "/candidate/manage-forms",
        name: "Manage Forms",
        icon: "ni ni-single-02 text-yellow",
        component: ManageForms,
        layout: "/ouradmin",
    },

];
export default candidate_routes;