export function modifyYoutubeUrl(string?: string) {
  if (string) {
    return string.replace('watch?v=', 'embed/');
  }

  return string;
}
