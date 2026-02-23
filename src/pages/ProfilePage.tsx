import { useNavigate } from 'react-router-dom';
import { Profile } from '@/components/Profile/Profile';

export const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <Profile
      open={true}
      onClose={() => navigate(-1)}
    />
  );
};
