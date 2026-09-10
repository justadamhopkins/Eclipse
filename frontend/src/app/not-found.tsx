import { ErrorPage } from '@core/ErrorPage';

const NotFound = () => {
  return (
    <ErrorPage
      status={404}
      title="This page doesn't exist anymore"
      message="The link may be out of date, or the page has moved. Everything else is still where it was."
    />
  );
};

export default NotFound;
