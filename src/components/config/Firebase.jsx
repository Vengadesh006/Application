import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, limitToLast, onValue, push, query, ref, set } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCU0ls6zxbvglhyWxwnrItkU7-rbzfCDdk",
  authDomain: "product-e52a2.firebaseapp.com",
  databaseURL: "https://product-e52a2-default-rtdb.firebaseio.com",
  projectId: "product-e52a2",
  storageBucket: "product-e52a2.firebasestorage.app",
  messagingSenderId: "1014443295218",
  appId: "1:1014443295218:web:0b0209aa50ebdb567f2b6b",
  measurementId: "G-1JTFX8XPHZ"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getDatabase(app)

export const googleProvide = new GoogleAuthProvider();

export const SENTMESSAGE = async (conventionId, text) => {
  try {
    const messageRef = ref(db, `/user/${conventionId}`)
    const dataRef = push(messageRef)
    await set(dataRef, text)

  } catch (err) {
    console.log(err)
  }
}

export const GETMESSAGE = async (conventionId, callback) => {
  console.log("convent : ",conventionId);
  
    try{
      const messageRef = ref(db , `/user/${conventionId}`)
      onValue(messageRef, (snapshot) => {
        callback(snapshot.val() || {})
      })

    }
    catch(err){
      console.log(err)
    }
}

export const lastMessage = async (conventionId) => {

  try{
    const lastMessageRef = ref(db, `user/${conventionId}`)

    const lastMsgRef = query(lastMessageRef, limitToLast(1) )

    onValue(lastMsgRef, (snapshot) => {

      snapshot.forEach((mgs) => {

        return mgs.val()

      })
    })

  }catch(err){
    console.log(err)
  }
  
}
