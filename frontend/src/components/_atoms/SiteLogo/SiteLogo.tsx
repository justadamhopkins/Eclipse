import NextImage from 'next/image';
import Link from 'next/link';

export const SiteLogo = () => {
  return (
    <Link
      href="/"
      aria-label="adam hopkins logo"
    >
      <NextImage
        src="/brand-logo.svg"
        alt="brand logo"
        width={80}
        height={80}
        unoptimized={true}
      />
    </Link>
  );
};
