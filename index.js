import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC090mISYP4igmkTih4FpvgclxwTjbT2BU",
  authDomain: "alprosavailabilitydb-ea3f4.firebaseapp.com",
  databaseURL:
    "https://alprosavailabilitydb-ea3f4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "alprosavailabilitydb-ea3f4",
  storageBucket: "alprosavailabilitydb-ea3f4.appspot.com",
  messagingSenderId: "127307638699",
  appId: "1:127307638699:web:271fc1406bc1b14a22d4ee",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const teacherInDB = ref(database, "teacherDB/");
console.log(Object.entries(teacherInDB.val()));

const monthSelect = document.getElementById("month-select");
const monthBtn = document.getElementById("month-btn");
const availbilityList = document.getElementById("availability-list");

monthBtn.addEventListener("click", function () {
  const monthYear = monthSelect.value;
  const year = monthYear.split("-")[0];
  const monthNumber = monthYear.split("-")[1];
  const date = new Date();
  date.setMonth(monthNumber - 1);
  const month = date.toLocaleString("en-US", { month: "long" });
  availbilityList.textContent = `Availability for ${month}, ${year}.`;
  push(teacherInDB, monthYear);
});

onValue(teacherInDB, function (snapshot) {
  console.log(snapshot.val());
});
