import ReactDOM from 'react-dom/client';
import './index.css';
import { CashProvider } from './context/CashContext';
import Transaction from './pages/TransaccionsPage';
import Informes from './pages/InformesPage';
import Categories from './pages/CategoriesPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Transaction />
  },
  {
    path:'/info',
    element:<Informes />
  },
  {
    path:'/categories',
    element:<Categories />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CashProvider>
    <RouterProvider router={router} />
  </CashProvider>
);
