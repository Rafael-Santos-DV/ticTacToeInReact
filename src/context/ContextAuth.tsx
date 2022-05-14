import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type UserType = {
  user: string;
  id: string;
  avatar: string;
};

type AuthContextType = {
  user: UserType | undefined;
  singInWithGoogle: () => Promise<void>;
  handleCacheSingInWithGoogle: () => Promise<UserType>;
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
};

type AuthContextPriverProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextPriverProps) {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const onsubscribe = auth.onAuthStateChanged((dataUser) => {
      if (dataUser) {
        const { displayName, uid, photoURL } = dataUser;

        if (!displayName || !photoURL) {
          throw new Error(`Missing information from Google Acount.`);
        }
        setUser({
          avatar: photoURL,
          id: uid,
          user: displayName,
        });
      }
    });

    return () => {
      onsubscribe();
    };
  }, []);

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

  async function handleCacheSingInWithGoogle() {
    const User: UserType = {
      avatar: '',
      id: '',
      user: '',
    };
    const onsubscribe = auth.onAuthStateChanged((dataUser) => {
      if (dataUser) {
        const { displayName, uid, photoURL } = dataUser;

        if (!displayName || !photoURL) {
          throw new Error(`Missing information from Google Acount.`);
        }
        User.avatar = photoURL;
        User.id = uid;
        User.user = displayName;
      }
    });

    onsubscribe();

    return User;
  }

  return (
    <AuthContext.Provider
      value={{ user, singInWithGoogle, handleCacheSingInWithGoogle, setUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
