import React from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import API_URL, { getHeaders } from 'config/api';
import pwdSettings from 'config/auth';

const authContext = React.createContext<any | undefined>(undefined);

function AuthProvider({ children }: any) {
  const [user, setUser] = React.useState(null);
  const [userDetails, setUserDetails] = useLocalStorage('userDetails', null);
  const [username, setUsername] = useLocalStorage('username', null);
  const [token, setSessionToken] = useLocalStorage('sessionToken', null);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const inactivityTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { Provider } = authContext;

  const isAdmin = () => {
    try {
      return userDetails.roles.includes('AppAdmin');
    } catch (er) {
      return false;
    }
  };

  const validateToken = async () => {
    const response = await fetch(`${API_URL}/auth/validate-token`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return response.ok;
  };

  const validatePassword = async (pwd: string, confirmPwd?: string) => {
    const validation: any = {
      hasLength: pwd.length >= pwdSettings.passwordLength,
      hasUpper: pwdSettings.requireUpper ? /[A-Z]/.test(pwd) : true,
      hasLower: pwdSettings.requireLower ? /[a-z]/.test(pwd) : true,
      hasNumber: pwdSettings.requireNumber ? /\d/.test(pwd) : true,
      hasSpecial: pwdSettings.requireSpecial ? /[!@#$%^&*_+\-=[\];|,.<>/?~]/.test(pwd) : true,
      hasNoIllegals: pwdSettings.requireSpecial ? !/[[\];,.()/~]/.test(pwd) : true,
      passwordMatch: confirmPwd && confirmPwd.length > 0 && pwd.length > 0 ? pwd === confirmPwd : false,
    };
    return Object.keys(validation).every((key) => validation[key] === true);
  };

  const isAllowed = (allowedList: any) => {
    try {
      const groups: string[] = userDetails.roles;
      if (groups.includes('Everything')) return true;
      let retVal = false;
      allowedList.forEach((item: any) => {
        if (groups.includes(item)) retVal = true;
      });
      return retVal;
    } catch (er) {
      return false;
    }
  };

  const login = async (data: { username: any; password: any }) => {
    try {
      const response: Response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (response.ok) {
        const authResponse = await response.json();
        if (authResponse?.data?.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
          setUsername(authResponse.data.username);
          setSessionToken(authResponse.data.accessToken);
          return authResponse.data;
        } else {
          //setting userDetails
          setUser(authResponse.data.user);
          setUserDetails(authResponse.data.user);
          setUsername(authResponse.data.user.username);
          setSessionToken(authResponse.data.accessToken);
          return authResponse;
        }
      } else {
        return response;
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during authentication:', error);
      return null;
    }
  };

  const logout = async () => {
    const { username } = userDetails;
    const response: Response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username,
      }),
    });

    if (response.ok) {
      await response.json();
      setUser(null);
      setUsername(null);
      setUserDetails(null);
      setSessionToken(null);
      return true;
    } else {
      return false;
    }
  };

  const changePassword = async (data: { password: any }) => {
    const storedSession = localStorage.getItem('sessionToken');
    const session = storedSession ? JSON.parse(storedSession) : '';
    try {
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: data.password,
          session: session,
        }),
      });
      const authResponse = await response.json();
      if (authResponse.error) return authResponse;
      if (authResponse.data.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        setSessionToken(authResponse.data.Session);
        localStorage.setItem('username', authResponse.data.ChallengeParameters.USER_ID_FOR_SRP);
      } else {
        return authResponse;
        console.log('Password Changed');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during authentication:', error);
    }
  };

  const forgotPassword = async (data: { username: any }) => {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
        }),
      });
      const authResponse = await response.json();
      if (response.ok) {
        console.log('Password reset initiated. Please check your email.');
      } else {
        console.error('Error during password reset:', authResponse);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during password reset:', error);
    }
  };

  const confirmForgotPassword = async (data: { username: any; verificationCode: any; newPassword: any }) => {
    try {
      const response = await fetch(`${API_URL}/auth/confirm-forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          verificationCode: data.verificationCode,
          newPassword: data.newPassword,
        }),
      });
      const authResponse = await response.json();
      if (response.ok) {
        console.log('Password reset successfully.');
      } else {
        console.error('Error during password reset confirmation:', authResponse);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during password reset confirmation:', error);
    }
  };

  const getUserRoles = () => {
    try {
      return userDetails.roles;
    } catch (err) {
      console.error('Could not get user roles:', err);
    }
  };

  const resetInactivityAcrossTabs = () => {
    localStorage.setItem('lastActivity', Date.now().toString());
  };

  const onActivity = () => {
    resetInactivityAcrossTabs();
    // logoutAfterInactivity();
  };

  // const logoutAfterInactivity = () => {
  //   // Clear the existing timer, if there is one
  //   if (inactivityTimeout.current) {
  //     clearTimeout(inactivityTimeout.current);
  //     inactivityTimeout.current = null;
  //   }

  //   // Set a new timer
  //   inactivityTimeout.current = setTimeout(
  //     () => {
  //       setModalOpen(true); // Open the modal after 15 minutes of inactivity
  //     },
  //     15 * 60 * 1000,
  //   );
  // };

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
    // Indicate that the modal was dismissed in localStorage
    localStorage.setItem('modalDismissed', Date.now().toString());
    // Reset the timer
    // logoutAfterInactivity();
  };

  const getUserRedirectPath = (roles: string[]) => {
    try {
      if (roles && roles.length === 1) {
        if (roles.includes('LeakageReporting') || roles.includes('LeakageReportingAdmin')) return '/leakage-reporting';
      }
      return '/';
    } catch (er: any) {
      console.error(er);
      return '/';
    }
  };

  React.useEffect(() => {
    const initializeUser = async () => {
      console.log(userDetails);
      if (userDetails && (await validateToken())) {
        setUser(userDetails);
      }
    };
    initializeUser();
  }, []);

  React.useEffect(() => {
    window.addEventListener('mousemove', onActivity);
    window.addEventListener('mousedown', onActivity);
    window.addEventListener('keydown', onActivity);
    window.addEventListener('scroll', onActivity);
    // window.addEventListener('beforeunload', logout);

    return () => {
      window.removeEventListener('mousemove', onActivity);
      window.removeEventListener('mousedown', onActivity);
      window.removeEventListener('keydown', onActivity);
      window.removeEventListener('scroll', onActivity);
      // window.removeEventListener('beforeunload', logout);
    };
  }, [user]);

  React.useEffect(() => {
    const onStorageChange = (e: any) => {
      // if (e.key === 'lastActivity') {
      //   logoutAfterInactivity();
      // }
    };

    window.addEventListener('storage', onStorageChange);
    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, [user]);

  React.useEffect(() => {
    const handleStorageChange = (e: any) => {
      // Listen for modal dismissal and act accordingly
      if (e.key === 'modalDismissed') {
        setModalOpen(false); // Close the modal
        // logoutAfterInactivity(); // Reset the timer
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Provider
      value={{
        user,
        setUser,
        isAllowed,
        isAdmin,
        login,
        logout,
        changePassword,
        forgotPassword,
        confirmForgotPassword,
        isModalOpen,
        handleModalClose,
        getUserRoles,
        getUserRedirectPath,
        validatePassword,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthProvider, authContext };
