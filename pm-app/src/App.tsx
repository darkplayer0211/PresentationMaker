import './css/App.css';
import DefaultLayout from './layouts/defaultLayout';
import Home from './pages/home';

function App() {
  return (
    <div className='App'>
      <DefaultLayout >
        <Home />
      </DefaultLayout>
    </div>
  );
}

export default App;
