import styled from 'styles/styled-components';
import StyledButton from 'components/Button/StyledButton';

const UploadButton = styled(StyledButton)`
  width: 350px;
  margin-right: 1rem;
  border-width: 1px;
  font-size: 0.9rem;
  font-weight: 500;

  &:active {
    background: #41addd;
    color: #fff;
  }
`;

export default UploadButton;
