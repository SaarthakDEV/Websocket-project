import React from "react"

const Chats = React.lazy(() => import("../components/Chats/index.tsx"))
const Friends = React.lazy(() => import("../components/Friends/index.tsx"))

type PrivateRoute = {
    path: string,
    component: any,
}

const privateRoutes:PrivateRoute[] = [
    {
        path: "/chat/:id",
        component: Chats
    },
    {
        path: "/friends",
        component: Friends,
    }
]

export default privateRoutes