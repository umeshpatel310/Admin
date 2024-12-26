import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration (replace with your own config)
const firebaseConfig = {
    apiKey: "AIzaSyBy1GnNAIpiTbF8bcE960GROx9JVyyn3Ro",
    authDomain: "testapp-6bd8a.firebaseapp.com",
    databaseURL: "https://testapp-6bd8a-default-rtdb.firebaseio.com",
    projectId: "testapp-6bd8a",
    storageBucket: "testapp-6bd8a.appspot.com",
    messagingSenderId: "1083835564982",
    appId: "1:1083835564982:web:7ef2ecfe620f7f81d43717",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get the element for showing the notification count
const notificationCountElement = document.getElementById('notification-count');
const notificationCountElement2 = document.getElementById('notification-count2');
const notificationCountElement3 = document.getElementById('notification-count3');

const noticesRef3 = ref(database, 'users');

onValue(noticesRef3, (snapshot) => {
    const notices = snapshot.val();
    if (notices) {
        // Count the number of child elements in the "withdrwal" path
        const childCount = Object.keys(notices).length;

        // Update the notification count display
        notificationCountElement3.textContent = childCount;
    } else {
        // If no data exists, set the count to 0
        notificationCountElement3.textContent = '0';
    }
});

const noticesRef2 = ref(database, 'AddAmount');

onValue(noticesRef2, (snapshot) => {
    const notices = snapshot.val();
    if (notices) {
        // Count the number of child elements in the "withdrwal" path
        const childCount = Object.keys(notices).length;

        // Update the notification count display
        notificationCountElement2.textContent = childCount;
    } else {
        // If no data exists, set the count to 0
        notificationCountElement2.textContent = '0';
    }
});

// Listen to changes in the "withdrwal" path in Firebase Realtime Database
const noticesRef = ref(database, 'withdrwal');

onValue(noticesRef, (snapshot) => {
    const notices = snapshot.val();
    if (notices) {
        // Count the number of child elements in the "withdrwal" path
        const childCount = Object.keys(notices).length;

        // Update the notification count display
        notificationCountElement.textContent = childCount;
    } else {
        // If no data exists, set the count to 0
        notificationCountElement.textContent = '0';
    }
});
