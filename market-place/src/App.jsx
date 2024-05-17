import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import AccountForm from './component/AccountForm';
import UserControls from './pages/UserControls';
import Main from './pages/Main'
import ItemSell from './pages/ItemSell';
import ShopList from './pages/ShopList';
import ViewItem from './pages/ViewItem';
import Cart from './pages/Cart';
import CheckOut from './pages/Checkout';
import UpdateInventory from './pages/UpdateInventory';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [ 
      {
        path: "/",
        element: <Main/>
      },
      {
        path: "/account",
        element: <AccountForm/>
      },
      {
        path: "/dashboard",
        element: <UserControls/>
      },
      {
        path: "/add-item",
        element: <ItemSell/>
      },
      {
        path: "/shop",
        element: <ShopList/>
      },
      {
        path: "/view-item",
        element: <ViewItem/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/checkout",
        element: <CheckOut/>
      },
      {
        path: "/inventory",
        element: <UserControls/>
      },
      {
        path: "/edit-item",
        element: <UpdateInventory/>
      }, 
      {
        path: "/orders",
        element: <UserControls/>
      },
    ]
  }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} ></RouterProvider>
    </div>
  )
}

export default App;