import { useContext } from 'react';
import { AuthContext } from '../context/ContextAuth';

export function useAuth() {
  const { user, singInWithGoogle, handleCacheSingInWithGoogle } =
    useContext(AuthContext);
  return { user, singInWithGoogle, handleCacheSingInWithGoogle };
}
