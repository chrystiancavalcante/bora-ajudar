import Rebase from 're-base'
import firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyCbMoer5DCUEmi4iUdgdZEN_F4fUBHoDpU',
    authDomain: 'bora-ajudar-38fbf.firebaseapp.com',
    databaseURL: 'https://bora-ajudar-38fbf.firebaseio.com',
    projectId: 'bora-ajudar-38fbf',
    storageBucket: 'bora-ajudar-38fbf.appspot.com',
    messagingSenderId: '42786141447'
  }
  const app = firebase.initializeApp(config)
  const base = Rebase.createClass(app.database())
  export const auth = firebase.auth()
  export default base
