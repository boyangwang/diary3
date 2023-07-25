import { Octokit } from '@octokit/rest';
import { Buffer } from 'buffer';
import { persistor } from '../../app/store';
import { LoginUserState } from '../../app/login-user-slice';
import { getDatetimeStringShortFormatFromNow } from '../../app/types-constants';
import { message } from 'antd';

export const isIncompleteGithubInfo = (loginUser: LoginUserState) => {
  return !loginUser.githubSecret || !loginUser.uid || !loginUser.repo || !loginUser.email;
};

/**
 * It should pause any persist. Load. Load to localstorage. Then persist. Then rehydrate. Then maybe resume persist.
 */
export const loadStateFromGithub = async (loginUser: LoginUserState) => {
  if (isIncompleteGithubInfo(loginUser)) {
    return console.log('Not logged in');
  }
  message.loading('Loading state from GitHub', 0);
  persistor.pause();

  const octokit = new Octokit({
    auth: loginUser.githubSecret,
    userAgent: 'diary-app',
  });
  const owner = loginUser.uid!;
  const repo = loginUser.repo!;
  const commit = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });
  const file = await octokit.rest.repos.getContent({ owner, repo, path: commit.data[0].commit.message });
  let downloadUrl;
  if (Array.isArray(file.data)) {
    // If file.data is an array, it's a directory object
    console.log('Cannot download directory');
    return;
  } else {
    // If file.data is an object, it's a file object
    downloadUrl = file.data.download_url;
  }
  if (downloadUrl) {
    const fileresponse = await fetch(downloadUrl);
    const stateToLoad = await fileresponse.json();
    localStorage.setItem('persist:diary', JSON.stringify(stateToLoad));
  } else {
    console.log('Download URL is not available');
  }
};

/**
 * First get the entire state json
 * Then decide the file name etc
 * Then upload the file to github
 */
export const saveStateToGithub = (loginUser: LoginUserState) => {
  if (isIncompleteGithubInfo(loginUser)) {
    return console.log('Not logged in');
  }
  message.loading('Saving state to GitHub', 0);

  return persistor.flush().then(() => {
    const state = localStorage.getItem('persist:diary');

    const octokit = new Octokit({
      auth: loginUser.githubSecret,
      userAgent: 'diary-app',
    });
    const path = `dairy-save-${loginUser.uid}-${getDatetimeStringShortFormatFromNow()}.json`;
    octokit.rest.repos
      .createOrUpdateFileContents({
        owner: loginUser.uid!,
        repo: loginUser.repo!,
        path,
        message: `${path}`,
        content: Buffer.from(state || '').toString('base64'),
        'committer.name': loginUser.uid,
        'committer.email': loginUser.email,
        'author.name': loginUser.uid,
        'author.email': loginUser.email,
      })
      .then((res) => {
        message.destroy();
      });
  });
};

const TestGithubStorage = () => {
  return <>TestGithubStorage</>;
};

export default TestGithubStorage;
