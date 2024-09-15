
export function useAuthState() {
  const isAuthenticated = useState<boolean>('isAuthenticated', () => false);

  const login = () => {
    isAuthenticated.value = true;
  };

  const signout = () => {
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    login,
    signout,
  };
}