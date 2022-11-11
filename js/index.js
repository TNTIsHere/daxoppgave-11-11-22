import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDXm8mHLdA1zqmWimiwUwSvzX4Nw08q540",
    authDomain: "daxoppgave-pawel-111122.firebaseapp.com",
    projectId: "daxoppgave-pawel-111122",
    storageBucket: "daxoppgave-pawel-111122.appspot.com",
    messagingSenderId: "602251640390",
    appId: "1:602251640390:web:87766af57e9b284d491447",
    measurementId: "G-4Y260NEZDZ"
  };

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, where("author", "==", "patrick rothfuss"), orderBy('createdAt'))

// realtime collection data
const unsubCol = onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

// adding docs
// const addEmail = document.querySelector('.add')
// addEmail.addEventListener('submit', (e) => {
//   e.preventDefault()

//   addDoc(colRef, {
//     title: addEmail.title.value,
//     author: addEmail.author.value,
//     createdAt: serverTimestamp()
//   })
//   .then(() => {
//     addEmail.reset()
//   })
// })

// deleting docs
// const deleteBookForm = document.querySelector('.delete')
// deleteBookForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   const docRef = doc(db, 'books', deleteBookForm.id.value)

//   deleteDoc(docRef)
//     .then(() => {
//       deleteBookForm.reset()
//     })
// })

// fetching a single document (& realtime)
// const docRef = doc(db, 'books', 'WHvDNJsV0XHk2sJ6PZtw')

// updating a document
// const updateForm = document.querySelector('.update')
// updateForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   let docRef = doc(db, 'books', updateForm.id.value)

//   updateDoc(docRef, {
//     title: 'the george floyd demon'
//   })
//   .then(() => {
//     updateForm.reset()
//   })
// })

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value
  const signupMsg = document.getElementById("append-user-created")

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      signupForm.reset()
      signupMsg.innerHTML = `<p>User account created, now login</p>`;
    })
    .catch(err => {
      console.log(err.message)
      signupMsg.innerHTML = `<p>Either the developer is retarded or you're retarded (most likely you)</p>`
    })
})

//logging in and out
// const logoutButton = document.querySelector('.logout')
// logoutButton.addEventListener('click', () => {
//   signOut(auth)
//     .then(() => {
//       console.log('user signed out')
//     })
//     .catch(err => {
//       console.log(err.message)
//     })
// })

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value
  const deleteLogin = document.getElementById("delete-form-login")
  const deleteSignup = document.getElementById("delete-form-signup")
  const appendFailLogin = document.getElementById("append-wrong-login")
  const deleteLoginText = document.querySelector(".delete-login-text")
  const loadMainPage = document.getElementById("main-page")
  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)

      loadMainPage.innerHTML = `<div>
      <h1>Your User: ${loginForm.email.value}</h1>
  </div>
  <div>
      <p>Add or subtract number:</p>
      <div>
          <button id="add">+</button>
          <button id="subtract">-</button>
      </div>
  </div>
  <div>
      <p id="num">${num}</p>
  </div>`;
      loginForm.reset()
      deleteLogin.innerHTML = ``;
      deleteSignup.innerHTML = ``;
      deleteLoginText.innerHTML = ``;
})
    .catch(err => {
      console.log(err.message)
      loginForm.reset()
      appendFailLogin.innerHTML = `<p>LMAOOOOO WRONG LOGIN HAHAHHAHAHHAH</p>`
    })
})
//add or subtract number
const addition = document.getElementById("add")
const subtract = document.getElementById("subtract")
const num = document.getElementById("num")
let a = 1;
addition.addEventListener("click", () => {
    a++;
    num.innerText = a;
})
subtract.addEventListener("click", () => {
    a--;
    num.innerText = a;
})