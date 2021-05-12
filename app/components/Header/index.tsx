import * as React from 'react';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocation } from '../../containers/App/selectors';

const stateSelector = createStructuredSelector({
  router: makeSelectLocation(),
});

function Header() {
  const { router } = useSelector(stateSelector);
  const { pathname: curPath } = router;

  const routeLinks = [
    {
      link: '/currencies',
      messages: 'Currencies',
    },
    {
      link: '/analysis',
      messages: 'Analysis',
    }
  ];

  return (
    <div>
      <NavBar>
        {routeLinks.map((route) => (
          <HeaderLink
            key={route.link}
            to={route.link}
            className={curPath === route.link ? 'active' : ''}
          >
            {route.messages}
          </HeaderLink>
        ))}
      </NavBar>
    </div>
  );
}

export default Header;
