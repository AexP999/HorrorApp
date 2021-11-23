export const useParseJwtHook = () => {
    const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[ 1 ]));
    } catch(e) {
      return null;
    }
  };

  return {parseJwt}
}
