// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  updateProfile,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  reauthenticateWithRedirect,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { userHandle } from "./utils";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  query,
  setDoc,
  where,
  getDocs,
  arrayUnion,
  doc,
  serverTimestamp,
  arrayRemove,
} from "firebase/firestore";
import {
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useRef } from "react";
import { useSelector } from "react-redux";

const firebaseConfig = {
  apiKey: "AIzaSyBKs_g1fM8I0TKKby4tvED5iozNCLkddPc",
  authDomain: "instagram-2409b.firebaseapp.com",
  projectId: "instagram-2409b",
  storageBucket: "instagram-2409b.appspot.com",
  messagingSenderId: "997576502113",
  appId: "1:997576502113:web:0e73b942b3eaab1ec1f320",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const db = getFirestore(app);

/*const imageRef = ref(storage, "image");
const postsRef = ref(storage, "image/posts.jpg");
const storiesRef = ref(storage, "image/stories");*/
const userId = auth.currentUser?.uid;
const storage = getStorage();

onAuthStateChanged(auth, (user) => {
  if (user) {
    userHandle(user);
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    userHandle(false);
    // ...
  }
});

export const uploadImage = (file) => {
  const storageRef = ref(storage, `posts/${userId}/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    (error) => {
      toast.error(error.code);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setTimeout(
          () => {
            toast.success("Image uploaded successfully");
          },

          2000
        );
        updatePost(downloadURL);
      });
    }
  );
};

export const downloadImage = async () => {
  await getDownloadURL(ref(storage, "image/posts"))
    .then((url) => {
      const img = document.getElementById("myimg");
      img.setAttribute("src", url);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    toast.error(error.code);
  }
};

export const signUp = async (email, username, password) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      profileUpdate(username);
      user.displayName = username;
      addData([], [], user.uid, [], [], username, [], 0, []);
      addUserChats(user.uid);
      addPostData(user.uid);
      // Update successful
      // ...
    })
    .catch((error) => {
      toast.error(error.code);
      // ..
    });
};

export const addUserChats = async (userId) => {
  await setDoc(doc(db, "userChats", userId), {});
};

export const logout = async () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export const addData = async (
  follower,
  following,
  userId,
  posts,
  stories,
  username,
  comments,
  likes,
  notifications
) => {
  try {
    await setDoc(doc(db, "users", userId), {
      follower: follower,
      following: following,
      posts: posts,
      stories: stories,
      username: username,
      comments: comments,
      likes: likes,
      notifications: notifications,
      userId: userId,
    });
  } catch (e) {
    console.log(e);
  }
};

export const profileUpdate = (username) => {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: username,
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};
export const profilePhotoUpdate = (photoURL) => {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    photoURL: photoURL,
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};

// real time listener eklemek lazım onSnapshot ile postları izlemeli
// yeni üye olunca 3 tane collection oluşturulmalı

// 1. posts
// 2. mesajlar
// 3. bilgileri

//posturl bilgisini storage a yüklediğimiz yerden alıp yazıyoruz

export const addPostData = async (userId) => {
  //post için db oluşturuyoruz
  try {
    await setDoc(doc(db, "posts", userId), {
      postUrl: [""],
    });
  } catch (e) {
    console.log(e);
  }
};

export const addChats = async (userId) => {
  //post için db oluşturuyoruz
  try {
    await setDoc(doc(db, "userChats", userId), {});
  } catch (e) {
    console.log(e);
  }
};
//ilk olarak mesaj için kişi seçebilmemiz gerekli bunun için kullanıcıları çekmemiz lazım
// simple queries kullanacağız users uid ile displayName eşitse diye where kullanılıyor

export const searchQuery = async (person) => {
  const queryRef = collection(db, "users");
  const q = query(queryRef, where("username", "==", person));
  const retArr = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    retArr.push(doc.data());
  });
  return retArr;
};

const updatePost = async (url) => {
  const postRef = doc(db, "users/", userId, "posts");
  await updateDoc(postRef, {
    posts: arrayUnion(url),
  });
};

export const addFollower = async (follower) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    following: arrayUnion(follower),
  });
};

export const removeFollower = async (follower) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    follower: arrayRemove(follower),
  });
};
