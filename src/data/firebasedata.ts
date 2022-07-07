import firebase from "firebase/compat/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCxzP_MV9whBjFDsBfVRzj1t5TEK3pVBAk",
  authDomain: "pokemonmem-55627.firebaseapp.com",
  projectId: "pokemonmem-55627",
  storageBucket: "pokemonmem-55627.appspot.com",
  messagingSenderId: "714661851141",
  appId: "1:714661851141:web:4c9862d7c79eaf12fc6c6c",
  measurementId: "G-R1TK499C3Y",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore();

async function getAllEasy() {
  const querySnapshot = await getDocs(collection(db, "easy"));
  const data: any[] = [];
  querySnapshot.query;
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      playername: doc.data().playername,
      step: doc.data().step,
      time: doc.data().time,
      createdate: doc.data().createdate,
    });
  });
  return data;
}
async function addEasy(rescord: any) {
  return await addDoc(collection(db, "easy"), {
    playername: rescord.playername,
    step: rescord.step,
    time: rescord.time,
    createdate: new Date(),
  });
}

async function getAllNormal() {
  const querySnapshot = await getDocs(collection(db, "normal"));
  const data: any[] = [];
  querySnapshot.query;
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      playername: doc.data().playername,
      step: doc.data().step,
      time: doc.data().time,
      createdate: doc.data().createdate,
    });
  });
  return data;
}
async function addNormal(rescord: any) {
  return await addDoc(collection(db, "normal"), {
    playername: rescord.playername,
    step: rescord.step,
    time: rescord.time,
    createdate: new Date(),
  });
}

async function getAllHard() {
  const querySnapshot = await getDocs(collection(db, "hard"));
  const data: any[] = [];
  querySnapshot.query;
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      playername: doc.data().playername,
      step: doc.data().step,
      time: doc.data().time,
      createdate: doc.data().createdate,
    });
  });
  return data;
}
async function addHard(rescord: any) {
  return await addDoc(collection(db, "hard"), {
    playername: rescord.playername,
    step: rescord.step,
    time: rescord.time,
    createdate: new Date(),
  });
}

export function easyCollect() {
  return { getAllEasy, addEasy, getAllNormal, getAllHard, addNormal, addHard };
}
