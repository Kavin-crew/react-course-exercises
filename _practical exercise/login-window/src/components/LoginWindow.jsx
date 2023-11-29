function LoginWindow() {
    return (
        <div className="login">
            <h2>Login</h2>
            <form className="form">
                <div className="form__row">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="form__row">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <p className="form__forgot_pass">Forgot password?</p>

                <button className="btn btn--login">Sign In</button>

                <p>or continue with</p>

                <div className="login__external">
                    <button className="btn btn--social_media"></button>
                    <button className="btn btn--social_media"></button>
                    <button className="btn btn--social_media"></button>
                </div>
            </form>
        </div>
    );
}

export default LoginWindow;
