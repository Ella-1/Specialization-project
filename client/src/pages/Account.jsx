import { useContext, useState } from "react";
import { UserContex } from "../userContex";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccounNavs from "./AccounNav";

function AccountPage({ data }) {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContex);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }

    // returns to login if not user
    if (!user) {
        return <Navigate to={'/login'} />
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccounNavs />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto" >
                    Logged in as {user.name} ({user.email})
                    <br />
                    <button onClick={logout} className=" max-w-sm mt-2 bg-grey-300 w-full bg-primary text-white rounded-2xl">Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <div>
                    <PlacesPage />
                </div>
            )}

        </div>
    )
}

export default AccountPage;