import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          {/* <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template">
            GitHub
          </Link> */}
        </li>
        <li>{/* <Link href="/">Sign in</Link> */}</li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {'An AI chatbot that\n'}
            <span className="text-primary-500">
              you have always desired for
            </span>
          </>
        }
        description="The easiest way to ask something to the AI."
        button={
          <Link href="https://discord.com/oauth2/authorize?client_id=1335557436349874346">
            <Button xl>Add to Discord</Button>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
