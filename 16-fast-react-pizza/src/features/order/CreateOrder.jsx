/*eslint no-unused-vars: "warn"*/
// import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) => /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);
/*eslint no-unused-vars: "warn"*/
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
/*eslint no-unused-vars: "warn"*/
function CreateOrder() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    const formErrors = useActionData();

    // const [withPriority, setWithPriority] = useState(false);
    const cart = fakeCart;

    return (
        <div>
            <h2>Ready to order? Let&apos;s go!</h2>

            {/* <Form method="POST" action="/order/new"> */}
            <Form method="POST">
                <div>
                    <label>First Name</label>
                    <input className="input" type="text" name="customer" required />
                </div>

                <div>
                    <label>Phone number</label>
                    <div>
                        <input className="input" type="tel" name="phone" required />
                    </div>
                    {formErrors?.phone && <p>{formErrors.phone}</p>}
                </div>

                <div>
                    <label>Address</label>
                    <div>
                        <input className="input" type="text" name="address" required />
                    </div>
                </div>

                <div>
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-yellow-400"
                        // value={withPriority}
                        // onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority">Want to yo give your order priority?</label>
                </div>

                <div>
                    <input className="input" type="hidden" name="cart" value={JSON.stringify(cart)} />
                    {/*eslint-disable-next-line*/}
                    <Button disabled={isSubmitting}>{isSubmitting ? 'Placing order...' : 'Order Now'}</Button>
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
        priority: data.priority === 'on',
    };

    const errors = {};
    if (!isValidPhone(order.phone)) {
        errors.phone = 'Please provide a valid contact number';
    }
    if (Object.keys(errors.length > 0)) return errors;

    // const newOrder = await createOrder(order);

    // return redirect(`/order/${newOrder.id}`);
    return null;
}

export default CreateOrder;
