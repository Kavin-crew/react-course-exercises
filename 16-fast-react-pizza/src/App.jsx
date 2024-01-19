/*eslint no-unused-vars: "warn"*/
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Menu from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder from './features/order/CreateOrder';
import Order from './features/order/Order';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/menu',
        element: <Menu />,
    },
    {
        path: '/cart',
        element: <Cart />,
    },
    {
        path: '/createorder',
        element: <CreateOrder />,
    },
    {
        path: '/order',
        element: <Order />,
    },
]);

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
