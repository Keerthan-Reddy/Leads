// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the Firebase database
const database = firebase.database();

// Form submission handling
document
  .getElementById("dataForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      mapsLink: document.getElementById("mapsLink").value,
      placeName: document.getElementById("placeName").value,
      contactNumber: document.getElementById("contactNumber").value,
      internName: document.getElementById("internName").value,
    };

    // Check for duplicate contact numbers before saving
    checkDuplicateContact(formData.contactNumber).then((isDuplicate) => {
      if (!isDuplicate) {
        saveFormData(formData);
      } else {
        alert("Contact number already exists. Please use a different one.");
      }
    });
  });

// Function to check for duplicate contact numbers
function checkDuplicateContact(contactNumber) {
  return database
    .ref("data")
    .orderByChild("contactNumber")
    .equalTo(contactNumber)
    .once("value")
    .then((snapshot) => {
      return snapshot.exists();
    });
}

// Function to save form data to Firebase
function saveFormData(formData) {
  const dataRef = database.ref("data").push();
  dataRef
    .set(formData)
    .then(() => {
      alert("Form data saved successfully!");
      // Clear the form after submission
      document.getElementById("dataForm").reset();
    })
    .catch((error) => {
      console.error("Error saving form data:", error);
    });
}
