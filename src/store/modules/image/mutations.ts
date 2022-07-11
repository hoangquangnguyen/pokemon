import { ArrayFunction } from "@/use/arrayfunction";

export function increaseLoaded(state: any, payload: number) {
  state.totalLoaded += payload;
}

export function setTotalImage(state: any, payload: number) {
  state.totalImage = payload;
}

export function setTotalLoaded(state: any, payload: number) {
  state.totalLoaded = payload;
}

export function cardReset(state: any) {
  state.cardImg = [];
  for (let index = 1; index <= state.totalAssetImage; index++) {
    state.cardImg.push(index);
  }
}

export function cardShuffle(state: any) {
  const { shuffle } = ArrayFunction();
  state.cardImg = shuffle(state.cardImg);
}

export function pickImageForCard(state: any, payload: number) {
  const { getN_elemental } = ArrayFunction();
  state.cardImg = getN_elemental(state.cardImg, payload);
}
