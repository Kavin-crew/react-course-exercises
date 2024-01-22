/*eslint no-unused-vars: "warn"*/
import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';
    console.log(navigation);

    return (
        <div className="layout">
            {isLoading && <Loader />}

            <Header />
            <main>
                <h1>Content</h1>
                <Outlet />
            </main>
            <CartOverview />
        </div>
    );
}

export default AppLayout;
