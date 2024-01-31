/*eslint no-unused-vars: "warn"*/
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
    const dispatch = useDispatch();

    return (
        <div className="flex gap-2 items-center md:gap-3">
            <Button type="round" onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>
                -
            </Button>
            <span className="font-medium text-sm">{currentQuantity}</span>
            <Button type="round" onClick={() => dispatch(increaseItemQuantity(pizzaId))}>
                +
            </Button>
        </div>
    );
}

export default UpdateItemQuantity;
