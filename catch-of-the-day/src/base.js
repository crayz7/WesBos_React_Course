import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp ({
        apiKey: "AIzaSyAXvsPFUI8em77vVjOE9DXLfgI3RtLw3rc",
        authDomain: "catch-of-the-day-jon-c.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-jon-c.firebaseio.com",
      
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;