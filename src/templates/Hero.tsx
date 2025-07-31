'use client';

import { deleteCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useEffect } from 'react';

import {
  onIdTokenChanged,
  signInWithGoogle,
  signOut,
} from '@/lib/firebase/auth';
import { createUserPremiumDocument } from '@/lib/firebase/user';

import { Background } from '../background/Background';
import { Button, ButtonColor } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const useUserSession = (initialUser: object | any) => {
  useEffect(() => {
    return onIdTokenChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        await setCookie('__session', idToken);

        // Ensure user premium document exists (for cases where user signs in through other means)
        try {
          await createUserPremiumDocument(user);
        } catch (error) {
          console.error('Error creating user premium document:', error);
        }
      } else {
        await deleteCookie('__session');
      }
      if (initialUser?.uid === user?.uid) {
        return;
      }
      window.location.reload();
    });
  }, [initialUser]);

  return initialUser;
};

const handleSignIn = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  signInWithGoogle();
};

const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  deleteCookie('__session');
  signOut();
};

const Hero = ({ initialUser }: { initialUser: any }) => {
  const user = useUserSession(initialUser);

  const handleUserClick = () => {
    const router = useRouter();
    router.push('/user');
  };

  const handleDiscordInstall = () => {
    window.open(
      'https://discord.com/oauth2/authorize?client_id=1335557436349874346',
      '_blank',
    );
  };

  return (
    <Background color="bg-gray-100">
      <Section yPadding="py-6">
        <NavbarTwoColumns logo={<Logo xl />}>
          <li>
            <Link href="/pricing">구매</Link>
          </li>
          {user ? (
            <>
              <li>
                <button
                  type="button"
                  onClick={handleUserClick}
                  className="profile cursor-pointer rounded px-2 py-1 transition-colors hover:bg-gray-50"
                >
                  <p className="flex items-center gap-2">
                    <img
                      className="profileImage size-6 rounded-full object-cover"
                      src={user.photoURL || '/profile.svg'}
                      alt={`Profile photo of ${user.displayName || 'User'}`}
                    />
                    {user.displayName}
                  </p>
                </button>
              </li>

              <div className="menu group relative">
                <button
                  type="button"
                  className="cursor-pointer"
                  aria-label="Open menu"
                >
                  ...
                </button>
                <ul className="invisible absolute right-0 top-full z-10 mt-1 rounded border border-gray-200 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <li>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="signOutButton block w-full whitespace-nowrap px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <li>
              <Link href="/" onClick={handleSignIn}>
                Sign in
              </Link>
            </li>
          )}
        </NavbarTwoColumns>
      </Section>

      <Section yPadding="pt-20 pb-32">
        <HeroOneButton
          title={
            <>
              {'내 메신저에서 대답하는 AI 챗봇'}
              <br />
              <span className="text-primary-500">Dabini</span>
            </>
          }
          description="AI를 사용하는 가장 쉬운 방법."
          button={
            <button
              type="button"
              onClick={handleDiscordInstall}
              className="cursor-pointer"
            >
              <Button xl color={ButtonColor.DISCORD}>
                Discord에 설치
              </Button>
            </button>
          }
        />
      </Section>
    </Background>
  );
};

export { Hero };
