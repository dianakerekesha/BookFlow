import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { doSingOut } from '@/firebase/auth';
import { firestore, auth } from '@/firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/constants/typography';
import { showSuccess, showError } from '@/lib/toast';
import { ChangePasswordModal } from './ChangePasswordModal';
import { DeleteAccountModal } from './DeleteAccountModal';
import { OrdersSection } from './OrdersSection';
import { User, ChevronRight, LogOut, Lock, Trash2 } from 'lucide-react';
interface UserProfile {
  name: string;
  phone: string;
}
const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'bg-card rounded-2xl border border-border p-6 md:p-8',
      className,
    )}
  >
    {children}
  </div>
);

const Field = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  disabled,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      className={cn(
        'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground',
        'placeholder:text-muted-foreground focus:outline-none focus:ring-2',
        'focus:ring-primary/20 focus:border-primary transition-all duration-200',
        disabled && 'opacity-50 cursor-not-allowed bg-muted',
      )}
    />
  </div>
);
export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>({ name: '', phone: '' });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const isGoogleUser =
    currentUser?.providerData?.[0]?.providerId === 'google.com';

  useEffect(() => {
    if (!currentUser?.uid) return;
    getDoc(doc(firestore, 'users', currentUser.uid))
      .then((snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setProfile({
            name: data.name || currentUser.displayName || '',
            phone: data.phone || '',
          });
        }
      })
      .catch(() => showError('Не вдалося завантажити профіль'))
      .finally(() => setLoadingProfile(false));
  }, [currentUser?.uid, currentUser?.displayName]);

  const handleSave = async () => {
    if (!currentUser?.uid) return;
    setSaving(true);
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
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await doSingOut();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1136px] px-4 md:px-6 py-8 md:py-12">
          <div className="mb-8">
            <h1 className={cn(TYPOGRAPHY.h2, 'text-foreground')}>
              Особистий кабінет
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {currentUser?.email}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <h2 className={cn(TYPOGRAPHY.h4, 'text-foreground mb-6')}>
                Особисті дані
              </h2>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-2 border-border flex-shrink-0">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className={cn(TYPOGRAPHY.h4, 'text-foreground')}>
                    {loadingProfile ?
                      <span className="inline-block h-5 w-32 bg-muted rounded animate-pulse" />
                    : profile.name || currentUser?.displayName || 'Користувач'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentUser?.email}
                  </p>
                </div>
              </div>

              {loadingProfile ?
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-14 bg-muted rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Ім'я та прізвище"
                    placeholder="Введіть ім'я"
                    value={profile.name}
                    onChange={(v) => setProfile((p) => ({ ...p, name: v }))}
                  />
                  <Field
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={currentUser?.email || ''}
                    disabled
                  />
                  <Field
                    label="Телефон"
                    type="tel"
                    placeholder="+38 (0xx) xxx-xx-xx"
                    value={profile.phone}
                    onChange={(v) => setProfile((p) => ({ ...p, phone: v }))}
                  />
                </div>
              }

              <button
                onClick={handleSave}
                disabled={saving || loadingProfile}
                className="mt-6 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Збереження...' : 'Зберегти зміни'}
              </button>
            </Card>

            <OrdersSection />

            <Card>
              <h2 className={cn(TYPOGRAPHY.h4, 'text-foreground mb-6')}>
                Безпека та акаунт
              </h2>
              <div className="flex flex-col gap-3">
                {!isGoogleUser && (
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="flex items-center justify-between w-full p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        Змінити пароль
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full p-4 rounded-xl border border-border text-foreground hover:bg-muted/50 transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Вийти з акаунту
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-3 w-full p-4 rounded-xl border border-[#eb5757]/30 text-[#eb5757] hover:bg-[#eb5757]/5 transition-colors text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Видалити акаунт
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}
    </>
  );
};
