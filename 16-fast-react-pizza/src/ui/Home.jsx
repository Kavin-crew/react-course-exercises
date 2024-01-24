import CreateUser from '../features/user/CreateUser';

function Home() {
    return (
        <div className="text-center my-10 sm:my-16">
            <h1 className="font-semibold  text-xl mb-8">
                The best pizza.
                <br />
                <span className="text-yellow-500"> Straight out of the oven, straight to you.</span>
            </h1>
            <CreateUser />
        </div>
    );
}

export default Home;
