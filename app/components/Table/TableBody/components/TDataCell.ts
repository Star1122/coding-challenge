import styled from 'styled-components';

const Td = styled.td`
  text-align: ${({ align }: any) => align || 'left'};
  padding: 5px 10px;
`;

export default Td;
