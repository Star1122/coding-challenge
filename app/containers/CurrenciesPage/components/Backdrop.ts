import styled from 'styles/styled-components';

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.2);
  transition: 0.5s;
`;

export default Backdrop;
