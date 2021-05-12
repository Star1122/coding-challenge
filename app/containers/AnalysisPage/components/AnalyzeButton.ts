import styled from 'styles/styled-components';
import StyledButton from 'components/Button/StyledButton';

const AnalyzeButton = styled(StyledButton)`
  width: 150px;
  max-width: 150px;
  min-width: 150px;

  &:active {
    background: #41addd;
    color: #fff;
  }

  &:disabled {
    border-color: #415d5d !important;
    color: #415d5d !important;
  }
`;

export default AnalyzeButton;
