import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/firebase/firebase';
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from 'firebase/auth';
import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/constants/typography';
import { showError } from '@/lib/toast';
import { X } from 'lucide-react';

const PasswordField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-muted-foreground">
      Введіть пароль для підтвердження
    </label>
    <input
      type="password"
      placeholder="••••••••"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
    />
  </div>
);

interface Props {
  onClose: () => void;
}

export const DeleteAccountModal = ({ onClose }: Props) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const isGoogleUser =
    currentUser?.providerData?.[0]?.providerId === 'google.com';

  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      if (!isGoogleUser) {
        if (!user.email) return;
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
      }
      await deleteUser(user);
      navigate('/login', { replace: true });
    } catch (err: unknown) {
      const code =
        err instanceof Error && 'code' in err ?
          (err as { code: string }).code
        : '';
      if (
        code === 'auth/wrong-password' ||
        code === 'auth/invalid-credential'
      ) {
        showError('Невірний пароль');
      } else if (code === 'auth/requires-recent-login') {
        showError('Потрібно повторно увійти в акаунт');
      } else {
        showError('Помилка при видаленні акаунту');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className={cn(TYPOGRAPHY.h4, 'text-[#eb5757]')}>
            Видалити акаунт
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Ця дія незворотня. Всі ваші дані будуть видалені. Ви впевнені?
        </p>

        {!isGoogleUser && (
          <div className="mb-6">
            <PasswordField
              value={password}
              onChange={setPassword}
            />
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Скасувати
          </button>
          <button
            onClick={handleDelete}
            disabled={loading || (!isGoogleUser && !password)}
            className="flex-1 px-4 py-3 rounded-xl bg-[#eb5757] text-white text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Видалення...' : 'Видалити'}
          </button>
        </div>
      </div>
    </div>
  );
};
