/*eslint no-unused-vars: "warn"*/
// import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
import { useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { useState } from 'react';
import store from '../../store';
import { useDispatch } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) => /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);
/*eslint no-unused-vars: "warn"*/
/*
const fakeCart = [
    {
        pizzaId: 12,
        name: 'Mediterranean',
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
    },
    {
        pizzaId: 6,
        name: 'Vegetale',
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
    },
    {
        pizzaId: 11,
        name: 'Spinach and Mushroom',
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
    },
];
*/
/*eslint no-unused-vars: "warn"*/
function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false);
    const username = useSelector((state) => state.user.username);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    const formErrors = useActionData();
    const dispatch = useDispatch();

    // const cart = fakeCart;

    const cart = useSelector(getCart);

    const totalCartPrice = useSelector(getTotalCartPrice);
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
    const totalPrice = totalCartPrice + priorityPrice;

    if (!cart.length) return <EmptyCart />;

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">Ready to order? Let&apos;s go!</h2>

            <button onClick={() => dispatch(fetchAddress())}>Get position</button>

            {/* <Form method="POST" action="/order/new"> */}
            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input className="input grow" type="text" name="customer" defaultValue={username} required />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input className="input w-full" type="tel" name="phone" required />
                        {formErrors?.phone && <p className="mt-2 rounded-full bg-red-200 text-red-700 text-sm px-2 py-1">{formErrors.phone}</p>}
                    </div>
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input className="input w-full" type="text" name="address" required />
                    </div>
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-yellow-400"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input className="input" type="hidden" name="cart" value={JSON.stringify(cart)} />
                    {/*eslint-disable-next-line*/}
                    <Button disabled={isSubmitting} type="primary">
                        {isSubmitting ? 'Placing order...' : `Order Now from ${formatCurrency(totalPrice)}`}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'true',
    };

    const errors = {};
    if (!isValidPhone(order.phone)) {
        errors.phone = 'Please provide a valid contact number';
    }
    if (Object.keys(errors).length > 0) return errors;

    const newOrder = await createOrder(order);
    store.dispatch(clearCart());
    return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
