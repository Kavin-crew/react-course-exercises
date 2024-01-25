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
        <div className="grid grid-rows-[auto_1fr_auto] h-screen">
            {isLoading && <Loader />}

            <Header />
            <section className="overflow-scroll">
                <main className="max-w-3xl mx-auto">
                    <h1>Content</h1>
                    <Outlet />
                </main>
            </section>

            <CartOverview />
        </div>
    );
}

export default AppLayout;
