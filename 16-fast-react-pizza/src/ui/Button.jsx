/*eslint no-unused-vars: "warn"*/
/*eslint-disable-next-line no-use-before-define*/

import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function Button({ children, disabled, to, type, onClick }) {
    const base =
        'rounded-full text-sm bg-yellow-500  font-semibold uppercase tracking-wide text-stone-800 hover:bg-yellow-300 transition-all duration-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed inline-block ';

    const styles = {
        primary: base + ' px-4 py-3 md:px-6 md:py-4',
        small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        secondary:
            'rounded-full text-sm font-semibold uppercase tracking-wide text-stone-400 hover:bg-stone-400 hover:text-stone-800 focus:text-stone-800 transition-all duration-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed inline-block border-2 border-stone-400 px-4 py-3 md:px-6 md:py-4',
    };

    if (to)
        return (
            <Link to={to} className={styles[type]}>
                {children}
            </Link>
        );

    if (onClick)
        return (
            <button disabled={disabled} onClick={onClick} className={styles[type]}>
                {children}
            </button>
        );

    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    );
}

export default Button;
