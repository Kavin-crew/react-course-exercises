import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
    return (
        <div className="bg-yellow-500 uppercase px-4 py-3 border-b border-stone-200 flex items-center justify-between">
            <Link to="/" className="tracking-[5px]">
                Fast React Pizza Co.
            </Link>
            <SearchOrder />
            <Username />
        </div>
    );
}

export default Header;
