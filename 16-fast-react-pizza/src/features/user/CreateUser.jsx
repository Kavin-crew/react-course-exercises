/*eslint no-unused-vars: "warn"*/
import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (!username) return;
        dispatch(updateName(username));
        navigate('/menu');
    }

    return (
        <form onSubmit={handleSubmit}>
            <p className="mb-10 text-sm text-slate-600 md:text-base">👋 Welcome! Please start by telling us your name:</p>

            <input
                className="w-72 input mb-8"
                type="text"
                placeholder="Your full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            {username !== '' && (
                <div>
                    {/*eslint-disable-next-line no-use-before-define */}
                    <Button type="primary">Start ordering</Button>
                </div>
            )}
        </form>
    );
}

export default CreateUser;
