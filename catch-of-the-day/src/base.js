import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp ({
        apiKey: "AIzaSyA8D1EPFuBlJV6qtfltu8KiRWuywQR8xP0",
        authDomain: "catch-of-the-day-jon-c-7.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-jon-c-7.firebaseio.com"
      
})

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;
