export const mockHtml = `
<html lang="en">
  <head>
    <link rel="icon" href="/favicon.ico" />
    <title>Mock Page</title>
    <script charset="utf-8" src="/hot-update.js"></script>
    <meta name="description" content="Mock meta" />
  </head>

  <body>
    <div id="main">
      <div>
        <div class="mock-class">
          <a class="sc-bwzfXH jZpftZ" href="/mock-any">
            <span>Mock</span>
            <span>Html</span>
          </a>
        </div>
      </div>
    </div>

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />
  </body>
</html>
`;

export const mockHtmlJson = {
  html: {
    body: {
      div: {
        div: {
          div: {
            a: {
              span: ['Mock', 'Html'],
            },
          },
        },
      },
      link: '',
    },
    head: {
      link: '',
      meta: '',
      script: '',
      title: 'Mock Page',
    },
  },
};

export const mockXml = `
<project>
  <component>
    <title></title>
    <comment></comment>
  </component>
  <component>
    <title></title>
    <comment>
      <title></title>
    </comment>
  </component>
  <component>
    <title></title>
    <comment>
      <comment></comment>
  </component>
</project>
`;

export const mockXmlJson = {
  project: {
    component: [
      { title: '', comment: '' },
      { title: '', comment: { title: '' } },
      { title: '', comment: { comment: '' } },
    ],
  },
};

export const mockXmlJsonAnalysis = {
  tagsArray: [
    ['project', 1],
    ['component', 3],
    ['title', 4],
    ['comment', 4],
  ],
  maxUsedTags: ['title', 'comment'],
  longestPaths: [
    {
      path: ['project', 'component', 'comment', 'title'],
      mostCommonTagUse: 2,
    },
    {
      path: ['project', 'component', 'comment', 'comment'],
      mostCommonTagUse: 2,
    },
  ],
};
