export const incremenStep = (context: any) => {
  //do something,ex: getdata from api, calculator data, parsedata...
  //commit data to mutation
  context.commit("incrementStep");
};

export const setStep = (context: any, payload: number) => {
  context.commit("setStep", payload);
};
