import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../lib/FirebaseConfig";

export const requireAuth = (Component: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push('/signin');
        }
      });

      return () => unsubscribe();
    }, []);

    return React.createElement(Component, props);
  };

  return AuthenticatedComponent;
};
