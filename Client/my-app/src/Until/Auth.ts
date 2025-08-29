import { jwtDecode } from 'jwt-decode';
export const isAuthenticated = () => {
  const data = localStorage.getItem("tokenCheckLogin");
  if (data) {
    const token = JSON.parse(data)
    const checkToken: boolean = isTokenExpired(token)
    if(checkToken == false)
       return true
    return false
  } else return false
};

const isTokenExpired = (token: string): boolean => {
  const decodedToken = jwtDecode(token);
  if (!decodedToken || !decodedToken.exp) {
    return true;
  }

  const expirationTimeMs = decodedToken.exp * 1000;
  const currentTimeMs = Date.now();

  return expirationTimeMs < currentTimeMs;
};