import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/sliceing/authslice';
import { backendCall } from '../../service/backendCall';
import { STORAGE } from '../../service/const'; // Import STORAGE key
import { StorageI } from '../../service/interface'; // Import StorageI interface

const GoogleAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      // Temporarily store an object with the token in localStorage under the STORAGE key
      // This allows backendCall to retrieve the token for the /auth/me request
      localStorage.setItem(STORAGE, JSON.stringify({ token: token }));
      
      // Fetch user details using the token
      backendCall({
        url: '/api/auth/me', // Use the getMe endpoint
        method: 'GET',
        // No need to manually add headers here, backendCall does it using GetStorage()
      })
        .then((response) => {
          const userData = response.data as Omit<StorageI, 'token'>;
          if (userData && userData.role) {
            dispatch(login({ user: { ...userData, token }, remember: true }));
            // Use window.location.replace to force a full page reload with updated state
            if (userData.role === 'admin') {
              window.location.replace('/admin/dashboard');
            } else {
              window.location.replace('/');
            }
          } else {
            console.error('Google OAuth Callback: Failed to fetch user details.');
            localStorage.removeItem(STORAGE); // Clean up temp token
            window.location.replace('/signin?error=user_fetch_failed');
          }
        })
        .catch((err) => {
          console.error('Google OAuth Callback: Error fetching user details:', err);
          localStorage.removeItem(STORAGE); // Clean up temp token
          window.location.replace('/signin?error=user_fetch_error');
        });
    } else if (error) {
      // Handle error, e.g., display an error message
      console.error('Google OAuth Error:', error);
      // Redirect to login page with an error indicator
      window.location.replace(`/signin?error=${error}`);
    } else {
      // Unexpected scenario, no token or error
      console.error('Google OAuth Callback: No token or error received.');
      window.location.replace('/signin?error=unknown');
    }
  }, [searchParams, navigate, dispatch]);

  // You can render a loading indicator or a simple message while processing
  return (
    <div>
      <p>Processing Google Sign-in...</p>
      {/* Add a spinner or loading animation here */}
    </div>
  );
};

export default GoogleAuthCallback;
