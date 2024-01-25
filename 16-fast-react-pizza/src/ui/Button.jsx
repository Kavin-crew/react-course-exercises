/*eslint no-unused-vars: "warn"*/
/*eslint-disable-next-line no-use-before-define*/

import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function Button({ children, disabled, to }) {
    const buttonStyle =
        'rounded-full bg-yellow-500 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 hover:bg-yellow-300 transition-all duration-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed inline-block sm:px-6 sm:py-4';

    if (to)
        return (
            <Link to={to} className={buttonStyle}>
                {children}
            </Link>
        );

    return (
        <button disabled={disabled} className={buttonStyle}>
            {children}
        </button>
    );
}

export default Button;
