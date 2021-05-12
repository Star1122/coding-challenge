import * as React from 'react';

import Ul from './Ul';
import Wrapper from './Wrapper';

interface Props {
  component: React.ComponentType<any>;
}

function List(props: Props) {
  const ComponentToRender = props.component;
  let content = (<div />) as JSX.Element | JSX.Element[];

  content = <ComponentToRender />;

  return (
    <Wrapper>
      <Ul>{content}</Ul>
    </Wrapper>
  );
}

export default List;
