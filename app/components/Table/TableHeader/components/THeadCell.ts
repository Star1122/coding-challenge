import styled from 'styled-components';

const Th = styled.th`
  text-align: ${({ align }: any) => align || 'left'};
  background: #fcf8c4;
  padding: 5px 10px;
`;

export default Th;
