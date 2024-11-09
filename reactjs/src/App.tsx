// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { publicRoutes } from './routes/index';
import DefaultLayout from './layouts/defaultLayout/index';
import './css/App.css';
import Home from './pages/home';
function App() {
  return (
      // <Router>
      //   <div className="App">
      //     <Routes>
      //       {publicRoutes.map((route, index) => {
      //         const Layout = route.layout || defaultLayout;
      //         const Page = route.component;
      //         return ( 
      //           <Route
      //             key={index}
      //             path={route.path}
      //             element={
      //               <Layout>
      //                <Page/>
      //               </Layout>
      //             }
      //           />
      //         )
      //       })}
      //     </Routes>
      //   </div>
      // </Router>
      <div className="App">
        <DefaultLayout >
          <Home />
        </DefaultLayout>
        </div>
  );
}

export default App;
