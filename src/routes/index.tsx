import ChoosingSongs from '../pages/choosingSongs'
import ChoosingTemp from '../pages/choosingTemp'
import Home from '../pages/home'
import Preview from '../pages/preview'

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

//Public routes
const publicRoutes : publicRoute[] = [
    {path:'/', component: Home},
    {path: '/choosingTemp', component: ChoosingTemp},
    {path: '/choosingSongs', component: ChoosingSongs},
    {path: '/preview', component: Preview},
]

const privateRoutes : privateRoute[] = [
    //Just in case
]

export {publicRoutes, privateRoutes}