import { get } from '../../utils/api';
import { ContentDto } from './analysis.dto';

export const getUrlContentRequest = async (url): Promise<ContentDto> =>
  get<ContentDto>(`http://localhost:8080/api/get-url-content?url=${url}`);
