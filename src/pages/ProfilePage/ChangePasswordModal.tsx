import React, { useState } from 'react';
import { auth } from '@/firebase/firebase';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/constants/typography';
import { showSuccess, showError } from '@/lib/toast';
import { Eye, EyeOff, X } from 'lucide-react';

const Field = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  rightElement,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  rightElement?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground',
          'placeholder:text-muted-foreground focus:outline-none focus:ring-2',
          'focus:ring-primary/20 focus:border-primary transition-all duration-200',
          rightElement && 'pr-12',
        )}
      />
      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  </div>
);

interface Props {
  onClose: () => void;
}

export const ChangePasswordModal = ({ onClose }: Props) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const ToggleBtn = ({
    show,
    onToggle,
  }: {
    show: boolean;
    onToggle: () => void;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {show ?
        <EyeOff className="w-4 h-4" />
      : <Eye className="w-4 h-4" />}
    </button>
  );

  const handleSubmit = async () => {
    if (newPassword.length < 6) {
      showError('Новий пароль має містити мінімум 6 символів');
      return;
    }
    if (newPassword !== confirmPassword) {
      showError('Паролі не збігаються');
      return;
    }
    const user = auth.currentUser;
    if (!user || !user.email) return;

    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      showSuccess('Пароль успішно змінено');
      onClose();
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
        <div className="flex items-center justify-between mb-6">
          <h3 className={cn(TYPOGRAPHY.h4, 'text-foreground')}>
            Змінити пароль
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Field
            label="Поточний пароль"
            placeholder="••••••••"
            type={showCurrent ? 'text' : 'password'}
            value={currentPassword}
            onChange={setCurrentPassword}
            rightElement={
              <ToggleBtn
                show={showCurrent}
                onToggle={() => setShowCurrent((v) => !v)}
              />
            }
          />
          <Field
            label="Новий пароль"
            placeholder="мін. 6 символів"
            type={showNew ? 'text' : 'password'}
            value={newPassword}
            onChange={setNewPassword}
            rightElement={
              <ToggleBtn
                show={showNew}
                onToggle={() => setShowNew((v) => !v)}
              />
            }
          />
          <Field
            label="Підтвердити новий пароль"
            placeholder="••••••••"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Скасувати
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Збереження...' : 'Змінити пароль'}
          </button>
        </div>
      </div>
    </div>
  );
};
