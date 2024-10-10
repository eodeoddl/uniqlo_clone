'use client';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import BackButton from './back-button';
import Header from './header';
import Social from './social';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  isSubmitting: boolean;
}

export default function CardWrapper({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  showSocial,
  isSubmitting,
}: CardWrapperProps) {
  return (
    <Card className='min-w-[400px] shadow-md'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social isSubmitting={isSubmitting} />
        </CardFooter>
      )}
      {/* card footer place link or other information */}
      <CardFooter>
        <BackButton
          href={backButtonHref}
          label={backButtonLabel}
          disabled={isSubmitting}
        />
        <BackButton href='/' disabled={isSubmitting} label={'홈으로'} / >
      </CardFooter>
    </Card>
  );
}
