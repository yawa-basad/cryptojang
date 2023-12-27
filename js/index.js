
if (typeof firebase === "undefined") {
    alert("Firebase SDK not detected. You must include it before initialization");
  }
  firebase.initializeApp({
    apiKey: "AIzaSyAvIsuf_K1uvzo3cXEJchcBWnxb7ryKzk0",
    authDomain: "jangneotokyo.firebaseapp.com",
    projectId: "jangneotokyo",
    storageBucket: "jangneotokyo.appspot.com",
    messagingSenderId: "20777123504",
    appId: "1:20777123504:web:5d991c72b7af82ff6f4575"
  });


  /**
   * @password
   */
  var p = localStorage.getItem('password')
  if (!p) {
    location.href = '../'
  } else {
      $('.parentDiv').fadeOut(3000)
  }


  /**
   * @database
   */
  const db = firebase.firestore()
  var refAddr = db.collection('addresses')

  


/**
 * 
 * @toastr
 */
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "30000000",
  "hideDuration": "100000",
  "timeOut": 0,
  "extendedTimeOut": 0,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": false,
  "tapToDismiss": false
}

/**
 * 
 * @toastr {*} content 
 */

async function toast(title, content, date) {

  toastr.success(`${title}<br><br>${content}: ${date}`)

}





/**
 * 
 * @message {*} owner 
 */

async function message(owner, details) {

  const data = {
    name: owner,
    content: details
  }

  let msg = `<div class="message theirs">
  <div class="message__name">${data.name}</div>
  <div class="message__bubble" ; title="">${data.content}</div>
</div>`;

const allMessages = document.querySelector(".messages");
allMessages.innerHTML += msg; //add message to the page
// Scroll messages area to its bottom
allMessages.scrollTop = allMessages.scrollHeight - allMessages.clientHeight; //scroll down as new chat messages being added


return;

}


async function addressDetails(address) {

  var addrDeta = db.collection(`${address}`)

  addrDeta.get().then( (querySnapshot) => {
    querySnapshot.forEach( (doc) => {
      var contract = doc.id;
      var d = doc.data();
      let date, worth;
      d.date = date;
      d.worth = worth;
      
      console.log(doc.data())
      message(`${address}`, `
      contract: ${contract} <br>
      approved: ${doc.data().approved} <br>

      `)


    })
  })

}

// var a = '0x2c5da2bcFe33ecF847F7558f6195BaBC2F582262'

// var addrDeta = db.collection(a.toLowerCase())

// addrDeta.get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//   });
// });






refAddr.orderBy('date')
  .onSnapshot( (querySnapshot) => {
    console.log(querySnapshot.docs.length);

  querySnapshot.docChanges().forEach( (change) => {
      var data = change.doc.data();
      var address = data.address;
      var status = data.status
      var date = data.date

      toast(address, status, date.toDate().toLocaleString())

      addressDetails(address.toLowerCase())

  })

  });


 
  
  














//   function chatvariable(vars) {
//   const BASIC_CHAT_DB = vars;
//   // let NAME = "User_" + Math.round(Math.random() * 1000);












//   let NAME = localStorage.getItem('userSTAT')
  
//   // addMessage2DOM({ content: `Welcome to Live Chat, ${NAME}`, name: "" });
  
//   const db = firebase.firestore(); //get a handle to firestore DB

//   const USERS = db.collection('userS').doc(localStorage.getItem('userSTAT'))

//   const admin = 'admin'


    
  
//   //this method adds the given data to page
//   function addMessage2DOM(data, id) {



//     let side;

//     let locale = localStorage.getItem('userSTAT')

//     // let side = data.name == locale ? "mine" : "theirs";


//     console.log(data.name)
//     console.log(locale)

//     if (data.name == 'cyrus') {
//       side = 'mine'
//     } else {
//       side = 'theirs'
//     }



//     let msg = `<div class="message ${side}">
//       <div class="message__name">${data.name}</div>
//       <div class="message__bubble" ; title="${data.name}">${data.content}</div>
//     </div>`;
  
//     const allMessages = document.querySelector(".messages");
//     allMessages.innerHTML += msg; //add message to the page
//     // Scroll messages area to its bottom
//     allMessages.scrollTop = allMessages.scrollHeight - allMessages.clientHeight; //scroll down as new chat messages being added
  
   
//     return;
//   }

//   function out(value) {
//     if ( value == '/logout') {
//         localStorage.clear();
//         setTimeout(() => {
//             location.href = '../'
//         }, 3000);
//     }
// }
  
//   const button = document.querySelector("#sendBtn");
  
//   button.addEventListener("click", () => {
//     //this function calls addMessage2DB with data from page
//     const input = document.querySelector("#input");
//     const value = input.value;
//     input.value = ""; //clear it after reading

//     let data;


    


    
//     USERS.get().then( function (doc) {
//         var status = doc.data().status;
  
//         if (status == 'admin') {
//             data = {
//                 name: admin,
//                 content: value,
//                 time: new Date(),
//               };
//               out(value)
//               addMessage2DB(data);
//         } else {
//             data = {
//                 name: status,
//                 content: value,
//                 time: new Date(),
//               };
//               out(value)
//               addMessage2DB(data);
//         }
  
//     })
    

//     //insert to DB and then snapshot handler takes care of adding it to DOM

  
//     return;
//   });
  
//   //keypressenter
//   input.addEventListener("keyup", function (event) {
//     if (event.keyCode === 13) {
//       event.preventDefault();
//       button.click();
      
//     }
//   });
  
//   //this method adds the given data to firebase database collection
//   function addMessage2DB(data) {
//     db.collection(BASIC_CHAT_DB)
//       .add(data)
//       .then(function (docRef) {
//         //if add is successful
//         console.log("Document written with ID: " + docRef.id);
//       })
//       .catch(function (error) {
//         //if add fails
//         console.logError("Error adding document: " + error);
//       });
//     return;
//   }
  
//   //lisen to DB changes . onSnapshot() works everytime data changed from anywhere
//   db.collection(BASIC_CHAT_DB)
//     .orderBy("time")
//     .onSnapshot((querySnapshot) => {
//       //this methods reads data from DB and calls addMessage2DOM
//       console.log("querySnapshot.docs.length: " + querySnapshot.docs.length);
//       //querySnapshot.forEach((doc) => {  //if you want all
//       querySnapshot.docChanges().forEach((change) => {
//         //if you want only changes
//         addMessage2DOM(change.doc.data(), change.doc.id);
//         vis()
        
//       });
//     });
  
//   }
  
  
  // var pageTitle = document.title;
  // var blinkInterval;
  // var isNotificationActive = false;
  
  // function startBlinkingNotification(message) {
  //   if (!isNotificationActive) {
  //     isNotificationActive = true;
  //     blinkInterval = setInterval(function() {
  //       document.title = (document.title === pageTitle) ? message : pageTitle;
  //     }, 1000); // Change the blinking speed as desired (in milliseconds)
  //   }
  // }
  
  // function stopBlinkingNotification() {
  //   if (isNotificationActive) {
  //     clearInterval(blinkInterval);
  //     document.title = pageTitle;
  //     isNotificationActive = false;
  //   }
  // }
  
  // // Listen for the visibilitychange event

  // // Check if the page is currently visible
  // function isPageVisible() {
  //   return !document.hidden;
  // }
  

  



  //   function vis() {
  //       document.addEventListener("visibilitychange", function() {
  //           if (isPageVisible()) {
  //             stopBlinkingNotification();
  //             console.log("Page is now visible");
  //             // Perform actions when the page becomes visible
  //                 // Usage example
    
      
  //     // To stop blinking after some time
  //     setTimeout(function() {
  //       stopBlinkingNotification();
  //     }, 5000); // Stop blinking after 5 seconds (adjust the duration as needed)
          
  //           } else {
  //             console.log("Page is now hidden");
  //             // Perform actions when the page becomes hidden
  //             startBlinkingNotification("New Message!"); // Start blinking with a custom message
         
  //           }
  //         });
  //   }



