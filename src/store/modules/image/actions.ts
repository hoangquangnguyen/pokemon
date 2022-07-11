export function increaseLoaded(context: any) {
  context.commit("increaseLoaded", 1);
}

export function setTotalImage(context: any, payload: number) {
  context.commit("setTotalImage", payload);
}

export function setTotalLoaded(context: any, payload: number) {
  context.commit("setTotalLoaded", payload);
}

export function cardReset(context: any) {
  context.commit("cardReset");
}

export function cardShuffle(context: any) {
  context.commit("cardShuffle");
}

export function pickImageForCard(context: any, num: number) {
  // because matrix get from 1,and img array get from 0 then the imgarray get langer than +1
  context.commit("pickImageForCard", num + 1);
}
