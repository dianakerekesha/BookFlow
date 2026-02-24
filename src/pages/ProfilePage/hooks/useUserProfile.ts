import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { firestore, auth } from '@/firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { showSuccess, showError } from '@/lib/toast';
import type { UserProfile } from '../types/userProfile';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>({ name: '', phone: '' });
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser?.uid) return;

    getDoc(doc(firestore, 'users', currentUser.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setProfile({
            name: data.name || currentUser.displayName || '',
            phone: data.phone || '',
          });
        }
      })
      .catch(() => showError('Не вдалося завантажити профіль'))
      .finally(() => setIsLoadingProfile(false));
  }, [currentUser?.uid, currentUser?.displayName]);

  const handleSaveProfile = async () => {
    if (!currentUser?.uid) return;

    setIsSaving(true);
    try {
      await setDoc(
        doc(firestore, 'users', currentUser.uid),
        { name: profile.name, phone: profile.phone },
        { merge: true },
      );
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: profile.name });
      }
      showSuccess('Дані збережено');
    } catch {
      showError('Помилка при збереженні');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNameChange = (name: string) => {
    setProfile((previousProfile) => ({ ...previousProfile, name }));
  };

  const handlePhoneChange = (phone: string) => {
    setProfile((previousProfile) => ({ ...previousProfile, phone }));
  };

  return {
    profile,
    isLoadingProfile,
    isSaving,
    currentUser,
    handleSaveProfile,
    handleNameChange,
    handlePhoneChange,
  };
};
