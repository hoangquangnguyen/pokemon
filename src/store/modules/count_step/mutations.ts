function incrementStep(state: any) {
  //receive data from actions
  //change state data
  state.countStep++;
}
function setStep(state: any, payload: number) {
  state.countStep = payload;
}
export default {
  incrementStep,
  setStep,
};
