import { Octokit } from '@octokit/rest';
import { Buffer } from 'buffer';
import { persistor } from '../../../app/store';
import { LoginUserState } from '../../../app/login-user-slice';
import { getDatetimeStringShortFormatFromNow } from '../../../app/types-constants';
import { message } from 'antd';
import { toast } from 'react-toastify';

export const isIncompleteGithubInfo = (loginUser: LoginUserState) => {
  return !loginUser.githubSecret || !loginUser.uid || !loginUser.repo || !loginUser.email;
};

/**
 * It should pause any persist. Load. Load to localstorage. Then persist. Then rehydrate. Then maybe resume persist.
 */
export const loadStateFromGithub = async (loginUser: LoginUserState) => {
  if (isIncompleteGithubInfo(loginUser)) {
    toast.error('Not logged in');
    return;
  }
  persistor.pause();
  const loadMsg = toast.loading('Loading...');

  const octokit = new Octokit({
    auth: loginUser.githubSecret,
    userAgent: 'diary-app',
  });
  const owner = loginUser.uid!;
  const repo = loginUser.repo!;
  try {
    const commit = await octokit.rest.repos.listCommits({
      owner,
      repo,
    });
    const file = await octokit.rest.repos.getContent({ owner, repo, path: commit.data[0].commit.message });
    let downloadUrl;
    console.log({ file, commit, downloadUrl });

    if (Array.isArray(file.data)) {
      // If file.data is an array, it's a directory object
      toast.update(loadMsg, { render: 'Cannot download directory', type: 'error', isLoading: false, autoClose: 3000 });
      return;
    } else {
      // If file.data is an object, it's a file object
      downloadUrl = file.data.download_url;
    }
    console.log({ file, commit, downloadUrl });

    if (downloadUrl) {
      const fileresponse = await fetch(downloadUrl);
      const stateToLoad = await fileresponse.json();
      localStorage.setItem('persist:diary', JSON.stringify(stateToLoad));
    } else {
      toast.update(loadMsg, { render: 'Download URL is not available', type: 'error', isLoading: false, autoClose: 3000 });
      return;
    }
    toast.update(loadMsg, { render: 'Loaded Successfully', type: 'success', isLoading: false, autoClose: 3000 });
  } catch (e: any) {
    toast.update(loadMsg, { render: e?.message ?? 'Loaded Error', type: 'error', isLoading: false, autoClose: 3000 });
  }
};

/**
 * First get the entire state json
 * Then decide the file name etc
 * Then upload the file to github
 */
export const saveStateToGithub = (loginUser: LoginUserState) => {
  if (isIncompleteGithubInfo(loginUser)) {
    toast.error('Not logged in');
    return;
  }
  const saveMsg = toast.loading('Saving...');

  return persistor
    .flush()
    .then(() => {
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
        .then(() => toast.update(saveMsg, { render: 'Save Successfully', type: 'success', isLoading: false, autoClose: 3000 }));
    })
    .catch((e) => toast.update(saveMsg, { render: e?.message, type: 'error', isLoading: false, autoClose: 3000 }));
};

const TestGithubStorage = () => {
  return <>TestGithubStorage</>;
};

export default TestGithubStorage;
