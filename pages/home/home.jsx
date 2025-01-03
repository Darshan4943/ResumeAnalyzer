import React from 'react';
import CandidateHome from '../candidate';
import EmployerHome from '../employer/EmployerHome';
import { useSelector } from 'react-redux';

function Home() {
    const { userDataGlobal } = useSelector((state) => state.user.userData);
    const isLogin = useSelector((state) => state.auth.isLogin);
    return (
        <div>
            {userDataGlobal?.role === "user" ?
                <CandidateHome />
                :
                <EmployerHome />

            }

        </div>
    );
}

export default Home;
