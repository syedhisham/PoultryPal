// hooks/useAuth.js
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setTokenAction, removeTokenAction } from '../../redux/tokenSlice'; // Your Redux actions and selectors
import { AxiosRequest } from '../../AxiosRequest/AxiosRequest';

const useAuth = () => {
  const storedToken = localStorage.getItem('token');
  const reduxToken = useSelector(selectToken);
  const token = reduxToken || storedToken; // Get token from Redux store or localStorage
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = useCallback(() => {
    dispatch(removeTokenAction());
  }, [dispatch]);

  const refreshAuthToken = useCallback(async () => {
    try {
      const response = await AxiosRequest.post('/api/user/refresh-token', { token });
      const newToken = response.data.token;

      // Update token in localStorage and Redux store
      dispatch(setTokenAction(newToken));
    } catch (error) {
      console.error('Error refreshing token:', error);
      handleLogout(); // Log out if token refresh fails
    }
  }, [token, dispatch, handleLogout]);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // Check if token is expired
        const response = await AxiosRequest.get('/api/user/check-token', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.isValid) {
          setIsLoading(false); // Token is valid, no further action needed
        } else {
          await refreshAuthToken();
        }
      } catch (error) {
        console.error('Error checking token validity:', error);
        handleLogout(); // Log out if there's an error
      } finally {
        setIsLoading(false);
      }
    };

    checkTokenValidity();
  }, [token, refreshAuthToken, handleLogout]);

  return { token, isLoading, refreshAuthToken, handleLogout };
};

export default useAuth;