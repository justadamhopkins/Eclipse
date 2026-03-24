import NextImage from 'next/image';
import Link from 'next/link';

export const SiteLogo = () => {
  return (
    <Link
      href="/"
      aria-label="adam hopkins logo"
    >
      <NextImage
        src="/brand-logo-2.svg"
        alt="brand logo"
        width={130}
        height={50}
        unoptimized={true}
      />
    </Link>
  );
};
