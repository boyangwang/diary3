import { Octokit } from '@octokit/rest';
import { Buffer } from 'buffer';
import { persistor } from '../app/store';
import { LoginUserState } from '../app/login-user-slice';
import { getDatetimeStringShortFormatFromNow } from '../app/types-constants';

/**
 * First get the entire state json
 * Then decide the file name etc
 * Then upload the file to github
 */
export const saveStateToGithub = (loginUser: LoginUserState) => {
  persistor.flush().then(() => {
    const state = localStorage.getItem('persist:diary');

    if (!loginUser.githubSecret || !loginUser.uid || !loginUser.repo || !loginUser.email) {
      return console.log('Not logged in');
    }

    const octokit = new Octokit({
      auth: loginUser.githubSecret,
      userAgent: 'diary-app',
    });
    const path = `dairy-data-${loginUser.uid}-${getDatetimeStringShortFormatFromNow()}`;
    octokit.rest.repos
      .createOrUpdateFileContents({
        owner: loginUser.uid,
        repo: loginUser.repo,
        path,
        message: `Commit ${path}`,
        content: Buffer.from(state || '').toString('base64'),
        'committer.name': loginUser.uid,
        'committer.email': loginUser.email,
        'author.name': loginUser.uid,
        'author.email': loginUser.email,
      })
      .then((res) => {
        console.log(res);
      });
  });
};

const TestGithubStorage = () => {
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

  return <>TestGithubStorage</>;
};

export default TestGithubStorage;
