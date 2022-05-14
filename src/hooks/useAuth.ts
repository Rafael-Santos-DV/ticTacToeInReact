import { useContext } from 'react';
import { AuthContext } from '../context/ContextAuth';

export function useAuth() {
  const { user, singInWithGoogle, handleCacheSingInWithGoogle, setUser } =
    useContext(AuthContext);
  return { user, singInWithGoogle, handleCacheSingInWithGoogle, setUser };
}
