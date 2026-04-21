import { Button } from 'react-bootstrap'
import { useAppDispatch } from '../redux/store'
import { logout } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'

export default function SignOut() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    };

    return (
        <div>
            <Button variant='outline-primary mt-2 mx-2' onClick={handleSignOut}>Sign Out</Button>
        </div>
    )
}
