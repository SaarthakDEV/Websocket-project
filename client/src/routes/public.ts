import React from "react"

const Dashboard = React.lazy(() => import("../components/Dashboard/index.tsx"))
const Login = React.lazy(() => import( "../components/Login"))

type PublicRoute = {
    path: string,
    component: any,
}

const publicRoutes: PublicRoute[] = [
    {
        path: "/",
        component: Dashboard
    },
    {
        path: "/login",
        component: Login
    }
]

export default publicRoutes