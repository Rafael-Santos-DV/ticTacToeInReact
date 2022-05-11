import { createContext, ReactNode, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type UserType = {
  user: string;
  id: string;
  avatar: string;
};

type AuthContextType = {
  user: UserType | undefined;
  singInWithGoogle: () => Promise<void>;
};

type AuthContextPriverProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextPriverProps) {
  const [user, setUser] = useState<UserType>();
  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Acount.');
      }

      setUser({
        avatar: photoURL,
        id: uid,
        user: displayName,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, singInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}