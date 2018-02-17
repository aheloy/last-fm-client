import React from 'react';
import { Route } from 'react-router-dom';

import SearchPage from 'src/containers/search-page';
import ArtistPage from 'src/containers/artist-page';

const Routes = () => {
  return (
    <React.Fragment>
      <Route path="/artist/:name" component={ArtistPage} exact />
      <Route path="/" component={SearchPage} exact />
    </React.Fragment>
  )
};

export default Routes;
