import Home from '../pages/home'
import Following from '../pages/following'

interface publicRoute {
    layout?: React.FC,
    path: string,
    component: React.FC<any>,
}

interface privateRoute {
    layout?: React.FC,
    path: string,
    component: React.FC<any>,
}

const publicRoutes : publicRoute[] = [
    {path:'/', component: Home},
    {path:'/following', component: Following},
]

const privateRoutes : privateRoute[] = [
]

export {publicRoutes, privateRoutes}