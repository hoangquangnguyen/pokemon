import { projectFirestore } from "@/data/firebasedata";
import { ref } from "vue";
import { doc, getDoc } from "firebase/firestore";

const error = ref(null);
const isPending = ref(false);
const result = ref();

async function getEasy() {
  error.value = null;
  isPending.value = true;
  try {
    const docRef = doc(projectFirestore, "easy");
    const response = await getDoc(docRef);
    if (response == null) throw new Error("Cannot login with ...");
    return response;
  } catch (err: any) {
    error.value = err;
  } finally {
    isPending.value = false;
  }
}

export function useSignIn() {
  return { error, isPending, result, getEasy };
}
