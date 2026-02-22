import { useAuth } from '@/context/authContext';
import { Icon } from '../ui/icons';
import { HeaderIconLink } from './HeaderIconLink';
import { doSingOut } from '@/firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookmarkToggle } from './BookmarkToggle';

type Props = {
  onMenuClick: () => void;
  onSearchIconClick: () => void;
};

export const HeaderToolBar = ({ onMenuClick, onSearchIconClick }: Props) => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Desktop + Tablet */}
      <div className="hidden sm:flex items-center h-full">
        <button
          onClick={onSearchIconClick}
          className="lg:hidden flex items-center justify-center h-[48px] w-[48px]"
          aria-label="Search"
        >
          <Icon
            name="search"
            className="w-4 h-4"
          />
        </button>

        <HeaderIconLink
          to="/favourites"
          className="w-[64px] h-full border-1"
        >
          <Icon
            name="heart"
            className="w-4 h-4"
          />
        </HeaderIconLink>

        <HeaderIconLink
          to="/cart"
          className="w-[64px] h-full border-1"
        >
          <Icon
            name="shoppingBag"
            className="w-4 h-4"
          />
        </HeaderIconLink>
        <div className="relative h-full w-fit flex items-center bg-secondary">
          {userLoggedIn ?
            <>
              <HeaderIconLink
                to="/profile"
                state={{ background: location }}
                className="w-[64px] h-full border-1"
              >
                <Icon
                  name="profileIcon"
                  className="w-4 h-4"
                />
              </HeaderIconLink>
              <HeaderIconLink
                className="w-[64px] h-full border-1"
                onClick={() => {
                  doSingOut().then(() => {
                    navigate('/login', { replace: true });
                  });
                }}
              >
                <Icon
                  name="signOut"
                  className="w-4 h-4"
                />
              </HeaderIconLink>
            </>
          : <>
              <HeaderIconLink
                to="/login"
                className="w-[64px] h-full border-1"
              >
                <Icon
                  name="signIn"
                  className="w-4 h-4"
                />
              </HeaderIconLink>
              <HeaderIconLink
                to="/signup"
                className="w-[64px] h-full border-1"
              >
                <Icon
                  name="signUp"
                  className="w-4 h-4"
                />
              </HeaderIconLink>
            </>
          }
          <BookmarkToggle />
        </div>
      </div>

      {/* Mobile burger */}
      <button
        onClick={onMenuClick}
        className="sm:hidden w-[48px] h-[48px] flex items-center justify-center border-l border-border relative bg-secondary isolate"
        aria-label="Menu"
      >
        <Icon
          name="menu"
          className="w-4 h-4"
        />
      </button>
      <div className="sm:hidden flex items-center h-full">
        <BookmarkToggle isMobile />
      </div>
    </>
  );
};
