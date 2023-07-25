import { Octokit } from '@octokit/rest';
import { Buffer } from 'buffer';

test('GitHub octokit API works', async () => {
  const octokit = new Octokit({
    auth: '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',
    userAgent: 'diary-app',
  });

  // octokit.rest.repos
  //   .createOrUpdateFileContents({
  //     owner: 'boyangwang',
  //     repo: 'diary-data',
  //     path: 'dairy-data-boyangwang-1-20230719-1523',
  //     message: 'Commit dairy-data-boyangwang-1-20230719-1523',
  //     content: Buffer.from('{ "test": 1 }').toString('base64'),
  //     'committer.name': 'boyangwang',
  //     'committer.email': 'wangboyang1991@gmail.com',
  //     'author.name': 'boyangwang',
  //     'author.email': 'wangboyang1991@gmail.com',
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });

  const owner = 'boyangwang';
  const repo = 'diary-data';
  const commit = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });
  const file = await octokit.rest.repos.getContent({ owner, repo, path: commit.data[0].commit.message });
  const fileresponse = await fetch((file.data as any).download_url);
  const stateToLoad = await fileresponse.json();
  console.log('XXXTEMP', stateToLoad);
});
