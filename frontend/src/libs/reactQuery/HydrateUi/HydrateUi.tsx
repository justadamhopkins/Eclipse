import {
  HydrationBoundary,
  type HydrationBoundaryProps,
} from '@tanstack/react-query';

const HydrateUi = (props: HydrationBoundaryProps) => {
  return <HydrationBoundary {...props} />;
};

export default HydrateUi;
