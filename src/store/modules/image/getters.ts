export function getTotalImage(state: any) {
  return state.totalImage;
}
export function loadImageComplete(state: any) {
  if (state.totalImage == 0) return false;
  if (state.totalLoaded != state.totalImage) return false;

  return true;
}
