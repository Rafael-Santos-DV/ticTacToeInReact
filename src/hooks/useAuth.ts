import { useContext } from 'react';
import { AuthContext } from '../context/ContextAuth';

export function useAuth() {
  const { user, singInWithGoogle } = useContext(AuthContext);
  return { user, singInWithGoogle };
}
