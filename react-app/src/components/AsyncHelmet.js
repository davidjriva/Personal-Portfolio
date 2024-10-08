import { Helmet, HelmetProvider } from 'react-helmet-async';

const AsyncHelmet = ({ pageName }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title> David Riva | {pageName} </title>
      </Helmet>
    </HelmetProvider>
  );
};

export default AsyncHelmet;
