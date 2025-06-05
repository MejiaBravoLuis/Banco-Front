import { useEffect, useState } from 'react';
import { getUserProfile } from '../../services/api'

const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserProfile();
      if (!data.error) {
        setUser(data.user);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useUserProfile;
