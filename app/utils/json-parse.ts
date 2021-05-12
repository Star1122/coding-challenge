import { AnalyzedResult, TagPath } from '../types';

const getTags = (
  data: any,
  curPath: string[] = [],
  paths: string[][] = [],
  tags = {},
  key = '',
) => {
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      const processTags = tags;
      if (tags[key]) {
        processTags[key] += data.length;
      } else {
        processTags[key] = data.length;
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const value of data) {
        getTags(value, curPath, paths, tags, key);
      }
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const keyName of Object.keys(data)) {
        const processTags = tags;
        if (!Array.isArray(data[keyName]) && keyName !== '#text') {
          if (tags[keyName]) {
            processTags[keyName] += 1;
          } else {
            processTags[keyName] = 1;
          }
        }

        getTags(
          data[keyName],
          [...curPath, keyName],
          paths,
          processTags,
          keyName,
        );
      }
    }
  }
  paths.push(curPath);

  return { paths, tags };
};

export const analyzeTags = (data): AnalyzedResult => {
  const tagsInfo = getTags(data);
  const tagsArray: any[] = Object.entries(tagsInfo.tags);

  const resPathStrings = Array.from(
    new Set(tagsInfo.paths.map(path => path.join('.'))),
  );
  const resPaths = resPathStrings.map(path => path.split('.'));

  const maxTagUseTimes: number = Math.max(...tagsArray.map(tag => tag[1]));

  const maxUsedTags = tagsArray
    .filter((tag: any[]) => tag[1] === maxTagUseTimes)
    .map(tag => tag[0]);

  const pathArrayWithCount = resPaths.map(
    (pathArr): TagPath => ({
      path: pathArr,
      mostCommonTagUse: maxUsedTags.reduce(
        (tagUseCount, tag) =>
          tagUseCount +
          pathArr.reduce((count, path) => count + (path === tag ? 1 : 0), 0),
        0,
      ),
    }),
  );

  const maxCommonTagUse: number = Math.max(
    ...pathArrayWithCount.map(path => path.mostCommonTagUse),
  );

  const paths = pathArrayWithCount.filter(
    path => path.mostCommonTagUse === maxCommonTagUse,
  );

  const maxPathLength = Math.max(...paths.map(path => path.path.length));

  const longestPaths = paths.filter(path => path.path.length === maxPathLength);

  return { tagsArray, maxUsedTags, longestPaths };
};
