import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  padding: 0;
  text-align: ${({ align }: any) => align || 'left'};
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export default Button;
