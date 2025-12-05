import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import { useNavigate } from 'react-router-dom';


function NavBar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();

    // Get the locatoin the user is at for redirect after login.
    const from = location.state?.from?.pathname || '/';
    const BACKEND_URL = import.meta.env.VITE_BACKEND_API_BASE_URL || '/api';

    // Backend URL from is used to redirect back after login.
    const googleLoginUrl = BACKEND_URL + '/auth/google?returnTo=' + from;

    const handleLogout = async () => {
        try{
            await logout();
            navigate('/');
        }
        catch (error) {
            console.error("Failed to logout: ", error);
        }
    }

    if(!isAuthenticated) {
        return (
            <nav>
                <Link to="/">Home</Link> | <a href={googleLoginUrl}>Login</a> 
            </nav>
        );
    }
    else {
        return (
            <nav>
                <Link to="/">Home</Link> | <Link to="/budget">{ user.displayname }</Link> | <Link to="/budget">Budget</Link> | <Link onClick={handleLogout}>Logout</Link>
            </nav>
        );
    }
}

export default NavBar;