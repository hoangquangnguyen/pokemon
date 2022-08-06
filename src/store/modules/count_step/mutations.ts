function incrementStep(state: any) {
  //receive data from actions
  //change state data
  state.countStep++;
  if (state.startGame == false) {
    state.startGame = true;
  }
}
function setStep(state: any, payload: number) {
  state.countStep = payload;
}
function setStartGame(state: any, payload: boolean) {
  state.startGame = payload;
}
export default {
  incrementStep,
  setStep,
  setStartGame,
};
