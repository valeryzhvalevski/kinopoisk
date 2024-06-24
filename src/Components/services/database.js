import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseConfig from "../../../firebase";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();

export async function addUser(userData) {
  try {
    const ref = db.ref("users").push();
    const key = ref.key;
    const newData = { ...userData, key };
    await ref.set(newData);
  } catch (e) {
    console.log(e);
  }
}
export async function getUsers() {
  try {
    const snapshot = await db.ref("users").once("value");
    return Object.values(snapshot.val());
  } catch (e) {
    console.log(e);
  }
}
