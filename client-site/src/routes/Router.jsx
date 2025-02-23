import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import AllUsers from "../pages/dashboard/AllUsers";
import CashAgent from "../pages/dashboard/CashAgent";
import Affiliators from "../pages/dashboard/Affiliators";
import GameCategories from "../pages/dashboard/GameCategories";
import UserProfile from "../pages/dashboard/UserProfile";
import AgentProfile from "../pages/dashboard/AgentProfile";
import GamesApi from "../pages/dashboard/GamesApi";
import AddGamesCategories from "../pages/dashboard/AddGamesCategories";
import FrontendSlider from "../pages/dashboard/FrontendSlider";
import PromotionOffer from "../pages/dashboard/PromotionOffer";
import DepositHistory from "../pages/dashboard/DepositHistory";
import WithdrawHistory from "../pages/dashboard/WithdrawHistory";
import AdminLogin from "../pages/admin-login/AdminLogin";
import ActiveGames from "../pages/dashboard/ActiveGames";
import InActiveGames from "../pages/dashboard/InActiveGames";
import HomeControl from "../pages/dashboard/HomeControl";
import AdminRoute from "./AdminRoute";
import Promotion from "../components/home/promotion/Promotion";
import CashAgentLayout from "../layout/CashAgentLayout";
import DemoGame from "../pages/home/DemoGame";
import BecomeAnAgent from "../components/become-an-agent/BecomeAnAgent";
import CashAgentHome from "../pages/cash-agent/CashAgentHome";
import CashAgentRoute from "./CashAgentRoute";
import CashAgentProfile from "../pages/cash-agent/CashAgentProfile";
import Kyc from "../pages/dashboard/Kyc";
import AffiliatesLayout from "../layout/AffiliatesLayout";
import Affiliates from "../pages/affiliates/Affiliates";
import Sign from "../components/affiliates/Sign";
import Login from "../components/affiliates/Login";
import Terns from "../components/affiliates/Terns";
import Privacy from "../components/affiliates/Privacy";
import Disconnection from "../components/affiliates/Disconnection";
import Faqs from "../components/affiliates/Faqs";
import Pages from "../pages/page/Pages";
import ManagePages from "../pages/dashboard/ManagePages";
import AffiliatesHome from "../pages/affiliates-dashboard/AffiliatesHome";
import HomeAffiliate from "../pages/affiliates/HomeAffiliate";
import PaymentMethodRequests from "../pages/dashboard/PaymentMethodRequests";
import AgentProfileView from "../pages/dashboard/AgentProfileView";
import AffiliateRoute from "./AffiliateRoute";
import AffiliateProfile from "../pages/affiliates-dashboard/AffiliateProfile";
import MyAffiliateLinks from "../pages/affiliates-dashboard/MyAffiliateLinks";
import ReferralRedirect from "../components/shared/ReferralRedirect ";
import AllAffiliateLinks from "../pages/dashboard/AllAffiliateLinks.jsx";
import CommissionSetting from "../pages/dashboard/CommissionSetting.jsx";
import NotFound from "../pages/NotFound";
import DepositLastPage from "../components/home/deposit-modal/DepositLastPage";
import DepositMethod from "../pages/dashboard/DepositMethod";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/games/demo/:id",
        element: <DemoGame />,
      },
      {
        path: "/promotion",
        element: <Promotion />,
      },
      {
        path: "/signup",
        element: <ReferralRedirect />, // Redirect to homepage when ref query is present
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      { path: "", element: <DashboardHome /> },
      { path: "all-user", element: <AllUsers /> },
      { path: "cashagent", element: <CashAgent /> },
      { path: "kyc", element: <Kyc /> },
      { path: "affiliators", element: <Affiliators /> },
      { path: "allaffiliatelinks", element: <AllAffiliateLinks /> },
      { path: "game-categories", element: <GameCategories /> },
      { path: "active-games", element: <ActiveGames /> },
      { path: "inactive-games", element: <InActiveGames /> },
      { path: "games-api/:id", element: <GamesApi /> },
      { path: "user-profile", element: <UserProfile /> },
      { path: "agentprofile/:id", element: <AgentProfile /> },
      { path: "paymentmethodrequests", element: <PaymentMethodRequests /> },
      { path: "add-games-categories", element: <AddGamesCategories /> },
      { path: "home-control", element: <HomeControl /> },
      { path: "frontend-slider", element: <FrontendSlider /> },
      { path: "promotion-offer", element: <PromotionOffer /> },
      { path: "deposits", element: <DepositHistory /> },
      { path: "depositmethod", element: <DepositMethod /> },
      { path: "withdraws", element: <WithdrawHistory /> },
      { path: "manage-pages", element: <ManagePages /> },
      { path: "viewagentprofile/:id", element: <AgentProfileView /> },
      { path: "commissionsetting", element: <CommissionSetting /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/cashagent",
    element: (
      <CashAgentRoute>
        <CashAgentLayout />
      </CashAgentRoute>
    ),

    children: [
      { path: "", element: <CashAgentHome /> },
      { path: "profile/:id", element: <CashAgentProfile /> },
    ],
  },
  {
    path: "/becomeanagent",
    element: <BecomeAnAgent />,
  },
  {
    path: "/affiliate",
    element: <Affiliates />,
    children: [
      {
        path: "",
        element: <HomeAffiliate />,
      },
      {
        path: "terns",
        element: <Terns />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "disconnection",
        element: <Disconnection />,
      },
      {
        path: "faqs",
        element: <Faqs />,
      },
    ],
  },

  {
    path: "/affiliate/login",
    element: <Login />,
  },
  {
    path: "/affiliate/signup",
    element: <Sign />,
  },

  {
    path: "/affiliatesdashboard",
    element: (
      <AffiliateRoute>
        <AffiliatesLayout />
      </AffiliateRoute>
    ),
    children: [
      { path: "", element: <AffiliatesHome /> },
      { path: "profile/:id", element: <AffiliateProfile /> },
      { path: "myaffiliatelinks/:id", element: <MyAffiliateLinks /> },
    ],
  },
  {
    path: "/pages/:route",
    element: <Pages />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/depositlastpage",
    element: <DepositLastPage />,
  },
]);

export default router;
