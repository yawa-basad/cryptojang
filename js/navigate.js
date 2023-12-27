const app = firebase.initializeApp({
    apiKey: "AIzaSyDUXtotsJrj6onAiK_b2O5wZsbZs9eOI_A",
    authDomain: "zerozeroone-d5ea3.firebaseapp.com",
    databaseURL: "https://zerozeroone-d5ea3-default-rtdb.firebaseio.com",
    projectId: "zerozeroone-d5ea3",
    storageBucket: "zerozeroone-d5ea3.appspot.com",
    messagingSenderId: "596456248535",
    appId: "1:596456248535:web:7851334958f27e2131cc92",
    measurementId: "G-BNBLESZCPP"
  })

const db = firebase.firestore(app);

const ref = db.collection('userS')

$('.form__btn').on('click', function () {

    console.log('click')
    let V = $('.form__input').val()
   

    if (V == 'yawabasad') {
        localStorage.setItem('password', V)

        location.href = './chat.html'

    } else {
        setTimeout( () => {
            $('.form__error').html('rongpas')

            $('.form__input').on('click', () => {
                $('.form__error').html('')
            })

        }, 5000)
    }




    // window.open('panel', '_self')
})



