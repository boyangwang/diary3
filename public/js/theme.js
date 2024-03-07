(function () {
  const nowTheme = [
    'diary-theme-1',
    'diary-theme-1',
    'diary-theme-2',
    'diary-theme-2',
    'diary-theme-2',
    'diary-theme-3',
    'diary-theme-3',
    'diary-theme-4',
  ][Math.floor(8 * Math.random())];
  const arr = nowTheme.split('-');
  window.theme = arr[arr.length - 1];
  !document.documentElement.classList.length && document.documentElement.classList.add(nowTheme);
})();
