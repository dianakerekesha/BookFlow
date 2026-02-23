import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { doSingOut } from '@/firebase/auth';
import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/constants/typography';
import {
  User,
  ShoppingBag,
  Wallet,
  Settings,
  Camera,
  Tag,
  ChevronRight,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  CreditCard,
  Plus,
  LogOut,
  Lock,
  Globe,
  Trash2,
  Copy,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = 'profile' | 'orders' | 'wallet' | 'coupons' | 'settings';

// ─── Mock data — TODO: замінити на реальні дані ───────────────────────────────

const MOCK_ORDERS = [
  {
    id: 'ORD-2025-001',
    date: '15.01.2025',
    status: 'paid' as const,
    total: 47.5,
    items: 3,
  },
  {
    id: 'ORD-2025-002',
    date: '03.02.2025',
    status: 'processing' as const,
    total: 21.2,
    items: 1,
  },
  {
    id: 'ORD-2024-003',
    date: '20.12.2024',
    status: 'cancelled' as const,
    total: 33.9,
    items: 2,
  },
];

const MOCK_COUPONS = [
  {
    code: 'WELCOME10',
    discount: '10%',
    description: 'Знижка для нових користувачів',
    expires: '31.03.2025',
    used: false,
  },
  {
    code: 'SUMMER20',
    discount: '20%',
    description: 'Літня акція',
    expires: '01.09.2025',
    used: true,
  },
];

const STATUS_CONFIG = {
  paid: {
    label: 'Оплачено',
    icon: CheckCircle,
    cls: 'text-[#27ae60] bg-[#27ae60]/10',
  },
  processing: {
    label: 'Обробляється',
    icon: Clock,
    cls: 'text-amber-500 bg-amber-500/10',
  },
  pending: {
    label: 'Очікує',
    icon: Clock,
    cls: 'text-amber-500 bg-amber-500/10',
  },
  failed: {
    label: 'Помилка',
    icon: XCircle,
    cls: 'text-[#eb5757] bg-[#eb5757]/10',
  },
  cancelled: {
    label: 'Скасовано',
    icon: XCircle,
    cls: 'text-[#eb5757] bg-[#eb5757]/10',
  },
};

// ─── Shared UI ────────────────────────────────────────────────────────────────

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

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className={cn(TYPOGRAPHY.h4, 'text-foreground mb-6')}>{children}</h2>
);

const Field = ({
  label,
  placeholder,
  type = 'text',
  defaultValue,
  disabled,
}: {
  label: string;
  placeholder: string;
  type?: string;
  defaultValue?: string;
  disabled?: boolean;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
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

const SaveButton = ({
  children = 'Зберегти зміни',
  onClick,
}: {
  children?: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="mt-6 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
  >
    {/* TODO: підключити реальну логіку збереження */}
    {children}
  </button>
);

// ─── Tab: Profile ─────────────────────────────────────────────────────────────

const ProfileTab = ({ user }: { user: unknown }) => (
  <div className="flex flex-col gap-6">
    <Card>
      <SectionTitle>Особисті дані</SectionTitle>

      {/* Avatar */}
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
        <div className="relative group cursor-pointer">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
            {/* TODO: user?.photoURL → показати фото */}
            {user?.photoURL ?
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            : <User className="w-8 h-8 text-muted-foreground" />}
          </div>
          <button
            className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            // TODO: onClick — відкрити діалог завантаження фото
          >
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>
        <div>
          <p className={cn(TYPOGRAPHY.h4, 'text-foreground')}>
            {/* TODO: user?.displayName */}
            {user?.displayName || 'Користувач'}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* TODO: defaultValue — з профілю користувача (Firestore/Firebase) */}
        <Field
          label="Ім'я"
          placeholder="Введіть ім'я"
        />
        <Field
          label="Прізвище"
          placeholder="Введіть прізвище"
        />
        <Field
          label="Email"
          type="email"
          placeholder="your@email.com"
          defaultValue={user?.email || ''}
          disabled
        />
        <Field
          label="Телефон"
          type="tel"
          placeholder="+38 (0xx) xxx-xx-xx"
        />
      </div>
      <SaveButton />
    </Card>

    <Card>
      <SectionTitle>Адреса доставки</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* TODO: defaultValue — збережена адреса користувача */}
        <Field
          label="Місто"
          placeholder="Київ"
        />
        <Field
          label="Поштовий індекс"
          placeholder="01001"
        />
        <div className="sm:col-span-2">
          <Field
            label="Адреса"
            placeholder="вул. Хрещатик, 1"
          />
        </div>
        <Field
          label="Країна"
          placeholder="Україна"
        />
      </div>
      <SaveButton>Зберегти адресу</SaveButton>
    </Card>
  </div>
);

// ─── Tab: Orders ──────────────────────────────────────────────────────────────

const OrdersTab = () => (
  <Card>
    <SectionTitle>Історія замовлень</SectionTitle>
    {/* TODO: замінити MOCK_ORDERS на getUserOrders() з paymentAPI */}
    {MOCK_ORDERS.length === 0 ?
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
        <Package className="w-12 h-12 opacity-30" />
        <p className="text-sm">Замовлень ще немає</p>
      </div>
    : <div className="flex flex-col gap-3">
        {MOCK_ORDERS.map((order) => {
          const cfg = STATUS_CONFIG[order.status];
          const Icon = cfg.icon;
          return (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors cursor-pointer group"
              // TODO: onClick → navigate(`/order-success/${order.id}`)
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    #{order.id}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {order.date} · {order.items} книг(и)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
                    cfg.cls,
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {cfg.label}
                </span>
                <span className="text-sm font-semibold text-foreground min-w-[56px] text-right">
                  ${order.total}
                </span>
                {order.status === 'paid' && (
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-muted"
                    title="Завантажити інвойс"
                    // TODO: onClick → DownloadInvoiceButton
                  >
                    <Download className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>
    }
  </Card>
);

// ─── Tab: Wallet ──────────────────────────────────────────────────────────────

const WalletTab = () => (
  <div className="flex flex-col gap-6">
    {/* Balance */}
    <div className="rounded-2xl bg-foreground text-background p-6 md:p-8">
      <p className="text-sm opacity-60 mb-1">Баланс гаманця</p>
      {/* TODO: замінити на реальний баланс користувача */}
      <p className="text-4xl font-bold tracking-tight">$0.00</p>
      <div className="flex gap-3 mt-6">
        <button
          className="px-5 py-2.5 rounded-xl bg-background text-foreground text-sm font-medium hover:opacity-80 transition-opacity"
          // TODO: onClick — поповнення через Stripe/LiqPay
        >
          Поповнити
        </button>
        <button
          className="px-5 py-2.5 rounded-xl border border-background/30 text-background text-sm font-medium hover:bg-background/10 transition-colors"
          // TODO: onClick — вивести кошти
        >
          Вивести
        </button>
      </div>
    </div>

    {/* Payment methods */}
    <Card>
      <SectionTitle>Методи оплати</SectionTitle>
      {/* TODO: список збережених карток/методів користувача */}
      <div className="flex flex-col items-center justify-center py-10 gap-3 text-muted-foreground">
        <CreditCard className="w-10 h-10 opacity-30" />
        <p className="text-sm">Збережених методів немає</p>
      </div>
      <button
        className="flex items-center gap-2 w-full justify-center px-4 py-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
        // TODO: onClick — додати картку через Stripe
      >
        <Plus className="w-4 h-4" />
        Додати картку
      </button>
    </Card>

    {/* Transaction history */}
    <Card>
      <SectionTitle>Транзакції</SectionTitle>
      {/* TODO: список транзакцій з Firebase/Firestore */}
      <div className="flex flex-col items-center justify-center py-10 gap-3 text-muted-foreground">
        <Wallet className="w-10 h-10 opacity-30" />
        <p className="text-sm">Транзакцій ще немає</p>
      </div>
    </Card>
  </div>
);

// ─── Tab: Coupons ─────────────────────────────────────────────────────────────

const CouponsTab = () => {
  const [code, setCode] = useState('');

  return (
    <div className="flex flex-col gap-6">
      {/* Activate coupon */}
      <Card>
        <SectionTitle>Активувати купон</SectionTitle>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Введіть промокод або купон"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className={cn(
              'flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm',
              'text-foreground placeholder:text-muted-foreground uppercase tracking-wider',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all',
            )}
          />
          <button
            className="px-6 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity flex-shrink-0"
            // TODO: onClick — перевірити та активувати купон через API
          >
            Застосувати
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Знижки можна застосувати при оформленні замовлення. Один купон за раз.
        </p>
      </Card>

      {/* My coupons */}
      <Card>
        <SectionTitle>Мої купони</SectionTitle>
        {/* TODO: замінити MOCK_COUPONS на реальні купони користувача з Firestore */}
        {MOCK_COUPONS.length === 0 ?
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-muted-foreground">
            <Tag className="w-10 h-10 opacity-30" />
            <p className="text-sm">Активних купонів немає</p>
          </div>
        : <div className="flex flex-col gap-3">
            {MOCK_COUPONS.map((coupon) => (
              <div
                key={coupon.code}
                className={cn(
                  'flex items-center justify-between p-4 rounded-xl border',
                  coupon.used ?
                    'border-border opacity-50 bg-muted/30'
                  : 'border-border bg-card',
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold',
                      coupon.used ?
                        'bg-muted text-muted-foreground'
                      : 'bg-[#27ae60]/10 text-[#27ae60]',
                    )}
                  >
                    {coupon.discount}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-mono font-semibold text-foreground tracking-wider">
                        {coupon.code}
                      </p>
                      {!coupon.used && (
                        <button
                          className="p-1 rounded hover:bg-muted transition-colors"
                          title="Скопіювати"
                          onClick={() =>
                            navigator.clipboard.writeText(coupon.code)
                          }
                        >
                          <Copy className="w-3 h-3 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {coupon.description} · до {coupon.expires}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    'text-xs px-3 py-1 rounded-full font-medium',
                    coupon.used ?
                      'bg-muted text-muted-foreground'
                    : 'bg-[#27ae60]/10 text-[#27ae60]',
                  )}
                >
                  {coupon.used ? 'Використано' : 'Активний'}
                </span>
              </div>
            ))}
          </div>
        }
      </Card>
    </div>
  );
};

// ─── Tab: Settings ────────────────────────────────────────────────────────────

const SettingsTab = ({ onLogout }: { onLogout: () => void }) => (
  <div className="flex flex-col gap-6">
    {/* Notifications */}
    <Card>
      <SectionTitle>Сповіщення</SectionTitle>
      <div className="flex flex-col gap-4">
        {[
          {
            label: 'Email-сповіщення про замовлення',
            sub: 'Статус та оновлення замовлень',
          },
          {
            label: 'Акції та знижки',
            sub: 'Нові купони та спеціальні пропозиції',
          },
          { label: 'Нові надходження', sub: 'Книги за вашими інтересами' },
        ].map(({ label, sub }) => (
          <div
            key={label}
            className="flex items-center justify-between py-2"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </div>
            {/* TODO: підключити реальний стан сповіщень */}
            <button
              className="w-11 h-6 rounded-full bg-muted relative transition-colors hover:bg-muted/80"
              role="switch"
              // TODO: onClick — toggle notification setting
            >
              <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-background shadow transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </Card>

    {/* Security */}
    <Card>
      <SectionTitle>Безпека</SectionTitle>
      <div className="flex flex-col gap-3">
        <button
          className="flex items-center justify-between w-full p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors group"
          // TODO: onClick — відкрити діалог зміни пароля
        >
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              Змінити пароль
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <button
          className="flex items-center justify-between w-full p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors group"
          // TODO: onClick — двофакторна автентифікація
        >
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              Двофакторна автентифікація
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </Card>

    {/* Danger zone */}
    <Card className="border-[#eb5757]/30">
      <SectionTitle>Небезпечна зона</SectionTitle>
      <div className="flex flex-col gap-3">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full p-4 rounded-xl border border-border text-foreground hover:bg-muted/50 transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Вийти з акаунту
        </button>
        <button
          className="flex items-center gap-3 w-full p-4 rounded-xl border border-[#eb5757]/30 text-[#eb5757] hover:bg-[#eb5757]/5 transition-colors text-sm font-medium"
          // TODO: onClick — підтвердження та видалення акаунту
        >
          <Trash2 className="w-4 h-4" />
          Видалити акаунт
        </button>
      </div>
    </Card>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Профіль', icon: User },
  { id: 'orders', label: 'Замовлення', icon: ShoppingBag },
  { id: 'wallet', label: 'Гаманець', icon: Wallet },
  { id: 'coupons', label: 'Купони', icon: Tag },
  { id: 'settings', label: 'Налаштування', icon: Settings },
];

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await doSingOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1136px] px-4 md:px-6 py-8 md:py-12">
        {/* Page header */}
        <div className="mb-8">
          <h1 className={cn(TYPOGRAPHY.h2, 'text-foreground')}>
            Особистий кабінет
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {/* TODO: currentUser?.displayName */}
            {currentUser?.email}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar nav */}
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    'whitespace-nowrap flex-shrink-0 lg:w-full',
                    activeTab === id ?
                      'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'profile' && <ProfileTab user={currentUser} />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'wallet' && <WalletTab />}
            {activeTab === 'coupons' && <CouponsTab />}
            {activeTab === 'settings' && (
              <SettingsTab onLogout={handleLogout} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
