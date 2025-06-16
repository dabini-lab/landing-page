'use client';

import { deleteCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useEffect } from 'react';

import {
  onIdTokenChanged,
  signInWithGoogle,
  signOut,
} from '@/lib/firebase/auth';

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

  return (
    <Background color="bg-gray-100">
      <Section yPadding="py-6">
        <NavbarTwoColumns logo={<Logo xl />}>
          <li>
            {/* <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template">
              GitHub
            </Link> */}
          </li>
          {user ? (
            <>
              <li>
                <div className="profile">
                  <p className="flex items-center gap-2">
                    <img
                      className="profileImage"
                      src={user.photoURL || '/profile.svg'}
                      alt={`Profile photo of ${user.displayName || 'User'}`}
                    />
                    {user.displayName}
                  </p>
                </div>
              </li>

              <li>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="signOutButton"
                >
                  Sign Out
                </button>
              </li>
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
              {'An AI chatbot that\n'}
              <span className="text-primary-500">you have always desired</span>
            </>
          }
          description="The easiest way to ask something to the AI."
          button={
            <Button xl color={ButtonColor.DISCORD}>
              Add to Discord
            </Button>
          }
        />
      </Section>
    </Background>
  );
};

export { Hero };
