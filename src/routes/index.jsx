import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PokemonsRoute from './PokemonsRoute';

const Routes = () => (
    <Switch>
        <Route exact path="/">
            <PokemonsRoute />
        </Route>
    </Switch>
);

export default Routes;