export function modifyYoutubeUrl(string?: string, replace_to?: string, replace_from?: string) {
  if(string) {
    return string.replace('watch?v=' || replace_to, 'embed/' || replace_from);
  }

  return string;
}