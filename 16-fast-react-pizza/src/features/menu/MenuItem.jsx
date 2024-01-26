/*eslint no-unused-vars: "warn"*/
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
/* eslint-disable-next-line */
function MenuItem({ pizza }) {
    /* eslint-disable-next-line */
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
    return (
        <li className="flex gap-4 py-2">
            <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'grayscale opacity-70' : ''}`} />
            <div className="flex flex-col grow pt-0.5">
                <p className="font-medium">{name}</p>
                {/* eslint-disable-next-line */}
                <p className="italic text-sm text-stone-500 capitalize">{ingredients.join(', ')}</p>
                <div className="my-auto flex items-center justify-between">
                    {!soldOut ? (
                        <p className="text-sm">{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>
                    )}

                    <Button type="small">Add to Cart</Button>
                </div>
            </div>
        </li>
    );
}

export default MenuItem;
