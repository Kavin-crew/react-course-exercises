/*eslint no-unused-vars: "warn"*/
import { formatCurrency } from '../../utils/helpers';
/* eslint-disable-next-line */
function MenuItem({ pizza }) {
    /* eslint-disable-next-line */
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
    return (
        <li>
            <img src={imageUrl} alt={name} />
            <div>
                <p>{name}</p>
                {/* eslint-disable-next-line */}
                <p>{ingredients.join(', ')}</p>
                <div>{!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}</div>
            </div>
        </li>
    );
}

export default MenuItem;
