import React, { useState } from 'react';
import LoginFrom from './LoginForm';
import AuthApi from '../api/AxiosAuth';
import ErrorBoundary from './Error';
import AuthenticationContext from '../contexts/AuthenticationContext';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));

function App() {
  const [accessToken, setToken] = useState(() => {
    const accessToken = window.localStorage.getItem('token');
    if (accessToken) {
      setExpireToken()
    }
    return accessToken;
  });
  const [isPreviousLoginFailed, setIsPreviousLoginFailed] = useState(false);



  function setExpireToken() {
    setTimeout(handleLogout, 360000);
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    setToken(null);
    setIsPreviousLoginFailed(false);
  };

  const handleLogin = async (credentials) => {
    AuthApi.login(credentials).then((response) => {
      const { accessToken } = response.data;
      window.localStorage.setItem('token', accessToken);
      setToken(accessToken);
      setExpireToken();
    }).catch(() => {
      setIsPreviousLoginFailed(true)
    });
  }


  return (
    <React.StrictMode>
      <div className="App">
        <ErrorBoundary message={"Cos poszlo nie tak ;("} >
          {
            !!accessToken ?
              <AuthenticationContext.Provider value={{ accessToken }}>
                <React.Suspense fallback={"... Loading"}>
                  <AuthenticatedApp onLogout={handleLogout} />
                </React.Suspense>
              </AuthenticationContext.Provider>
              :
              <LoginFrom errorMessage={isPreviousLoginFailed} onLogin={handleLogin} />
          }
        </ErrorBoundary>
      </div>
    </React.StrictMode>
  )
}


export default App;