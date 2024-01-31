/*eslint no-unused-vars: "warn"*/
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';

function CartItem({ item }) {
    const { pizzaId, name, quantity, totalPrice } = item;

    return (
        <li className="py-3 sm:flex sm:items-center sm:justify-between">
            <p className="mb-1 sm:mb-0">
                {quantity}&times; {name}
            </p>
            <div className="flex justify-between items-center gap-6">
                <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
                <DeleteItem pizzaId={pizzaId} />
            </div>
        </li>
    );
}

export default CartItem;
