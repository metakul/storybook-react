import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { Pages } from "./Datatypes/enums";
import DashboardLayout from "./layout/layout";
import HomePage from "./Pages/HomePage";
import StakingPage from "./Pages/StakingPage";
import SwapPage from "./Pages/SwapPage";

const Router: React.FC = () => {


  const routes = useRoutes([

    {
      path: "",
      element: <DashboardLayout/>,
      children: [
        {
          path: Pages.Home,
          element: <HomePage/>,
        },
        {
          path: Pages.Staking,
          element: <StakingPage/>,
        },
        {
          path: Pages.Swap,
          element: <SwapPage/>,
        },
  
   
      
      ],
    },
    { path: "*", element: <Navigate to={Pages.Home} /> },
  ]);

  return routes;
};

export default Router;