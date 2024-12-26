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

// Get the elements
const notificationCountElement = document.getElementById('notification-count');
const notificationPopup = document.getElementById('notification-popup');
const notificationListElement = document.getElementById('notification-list');
const popupCloseButton = document.getElementById('popup-close');

let unreadCount = 0;
let readNotices = JSON.parse(localStorage.getItem('readNotices')) || {};

// Listen to changes in the "notices" path in Firebase Realtime Database
const noticesRef = ref(database, 'notices');

onValue(noticesRef, (snapshot) => {
    const notices = snapshot.val();
    if (notices) {
        // Clear the list before appending new notifications
        notificationListElement.innerHTML = '';

        // Reset unread count
        unreadCount = 0;

        // Loop through all child notices and display them
        Object.keys(notices).forEach(key => {
            const notice = notices[key];

            // If notice is unread (not in readNotices)
            if (!readNotices[key]) {
                unreadCount++;
            }

            // Create a list item for each notice
            const noticeElement = document.createElement('li');
            noticeElement.textContent = notice.message;

            // Append the notice to the list (for popup)
            notificationListElement.appendChild(noticeElement);
        });

        // Update the notification count
        notificationCountElement.textContent = unreadCount;
    }
});

// Show the popup when the user clicks on the notification icon
document.querySelector('.notification-icon').addEventListener('click', function() {
    notificationPopup.style.display = 'block';

    // Mark all notifications as read
    Object.keys(readNotices).forEach(key => {
        readNotices[key] = true;  // Mark as read
    });

    // Store updated read notices in localStorage
    localStorage.setItem('readNotices', JSON.stringify(readNotices));

    // Reset unread count when popup is opened
    notificationCountElement.textContent = '0';
});

// Close the popup
function closePopup() {
    notificationPopup.style.display = 'none';
}

// Attach the closePopup function to the close button
popupCloseButton.addEventListener('click', closePopup);