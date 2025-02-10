import React from 'react';
import CandidateHome from '../candidate';

import { useSelector } from 'react-redux';
import Dashboard from '../dashboard';

function Home() {
    const { userDataGlobal } = useSelector((state) => state.user.userData);
    const isLogin = useSelector((state) => state.auth.isLogin);
    return (
        <div>
            {userDataGlobal?.role === "user" ?
                <CandidateHome />
                :
                <Dashboard />

            }

        </div>
    );
}

export default Home;
