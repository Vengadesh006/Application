import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { equalTo, get, getDatabase, limitToLast, onDisconnect, onValue, orderByChild, push, query, ref, serverTimestamp, set, update }
  from "firebase/database"

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
  console.log("convent : ", conventionId);

  try {
    const messageRef = ref(db, `/user/${conventionId}`)
    onValue(messageRef, (snapshot) => {
      callback(snapshot.val() || {})
    })

  }
  catch (err) {
    console.log(err)
  }
}

export const lastMessage = async (conventionId) => {

  try {
    const lastMessageRef = ref(db, `user/${conventionId}`)

    const lastMsgRef = query(lastMessageRef, limitToLast(1))

    onValue(lastMsgRef, (snapshot) => {

      snapshot.forEach((mgs) => {

        return mgs.val()

      })
    })

  } catch (err) {
    console.log(err)
  }

}
export const MessageUpdate = async (conversationId, userId) => {
  console.log("fire base : ", conversationId)

  try {
    const q = await query(
      ref(db, `user/${conversationId}`),
      orderByChild('receiverId'),
      equalTo(userId)
    )

    const snapshot = await get(q)

    const updates = [];
    snapshot.forEach(child => {
      const messageRef = ref(db, `user/${conversationId}/${child.key}`);
      updates.push(update(messageRef, { read: true }));
    });

    await Promise.all(updates);

    console.log();




  } catch (err) {
    console.error(" Error updating messages:", err);
  }
};



export const userStatus = async (userId) => {
  try {
    const userStatusRef = ref(db, `/userStatus/${userId}`);
    const connectedRef = ref(db, ".info/connected");

    onValue(connectedRef, (snapshot) => {
      const isConnected = snapshot.val();

      if (isConnected === false || isConnected === null) return;

      // When user connects
      const con = userStatusRef;

      // Set the disconnect logic FIRST — this triggers when user goes offline
      onDisconnect(con).set({
        status: "offline",
        last_seen: serverTimestamp(),
      });

      // Then mark user online
      set(con, {
        status: "online",
        last_seen: serverTimestamp(),
      });
    });
  } catch (err) {
    console.error("Error in userStatus:", err);
  }
};
