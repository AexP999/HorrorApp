import { useParseJwtHook } from '../Hooks/parse.hook';
import { useHttpHook } from '../Hooks/api.hook';

export const useUserDataHook = () => {
    
  const { parseJwt } = useParseJwtHook();
  const { api } = useHttpHook();

  const getUserDataFromDb = async () => {
    const token = localStorage.getItem('token')
    const { userId:id } = parseJwt(token);

    try {
      const result = await api.get(`/auth/users/${ id }`);
      console.log('RESULT', result.data)
      if(!result) {
          console.log('wrong token');
      }
      const { _id:userId, email, role } = result.data;
      return { userId, email, role }

      } catch(err) {
        console.log(err);
      };
  }
  return {getUserDataFromDb}
}
