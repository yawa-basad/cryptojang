const config = {
  apiKey: "AIzaSyAvIsuf_K1uvzo3cXEJchcBWnxb7ryKzk0",
  authDomain: "jangneotokyo.firebaseapp.com",
  projectId: "jangneotokyo",
  storageBucket: "jangneotokyo.firebasestorage.app",
  messagingSenderId: "20777123504",
  appId: "1:20777123504:web:5d991c72b7af82ff6f4575"
}
  const app = firebase.initializeApp(config)
  const db = firebase.firestore(app)
  
  const ref = db.collection('jangtokyo')
  
  
  function status(v) {
      $('#status').html(v)
  }
  
  $(document).ready( function() {
    $('textarea').val(localStorage.getItem('text'))

  
  
    $('#address').val(localStorage.getItem('address'))


    $('#loading').show()
    status('system ok')
  
        // if (localStorage.getItem('address') !== null) {
        //     setTimeout( () => {
        //         check(localStorage.getItem('address'))
        //       }, 1500)
        // } else {
        //     console.log('asd')
        // }
  
  })
  
  
  // const address = '0x2c5da2bcFe33ecF847F7558f6195BaBC2F582262';

  $('#checkAddress').on('click', () => {
        const v = $('#address').val()

        $('#information').hide()
        $('ul').html('')
        $('#eth_value').val('')
        $('#showETH').val('')
        $('#add_contract').val('')
        $('#worth').val('')
        $('#transactionHash').html('')
        status('loading')
        
      setTimeout(() => {
        $('#information').show()
     
        check(v)
        checkEth(v)
        status('loaded')

      }, 500);
  })
  
  $('#address').on('input', (e) => {
        
        if (e.target.value.length === 0) {
          $('#loading').hide()
        } else {
          localStorage.setItem('address', e.target.value)
          $('#loading').show()
        }
  
        
  
  
  
  })
  
  
  async function check(address) {


   await db.collection(address.toLowerCase()).orderBy('worth', 'desc').get().then((query) => {
      query.forEach((d) => {
        $('#loading').hide()
        console.log(d.data())
        let type = d.data().type

        console.log(type)
   

        if (type == 'token') {

          $('ul').append(`<li id="${d.data().contract}">
          <button class="delete">🗑️</button>
          <small style="background-color: black">📀</small>
        ${d.data().contract} <small style="color: red"> ${d.data().worth}</small> </li>`) 



        } else {
          
          $('ul').append(`<li id="${d.data().contract}">
          <button class="delete">🗑️</button>
          <small style="background-color: black">💎</small>
        ${d.data().contract} <small style="color: red"> ${d.data().worth}</small> </li>`)
  
        }



  
      })
  
  
      $('li').find('button').each(function () {
        console.log($(this).html())
  
        $(this).on('click', () => {
              console.log($(this).parent().attr('id'))
  
          DEL(`${address.toLowerCase()}`,`${$(this).parent().attr('id')}`)
        })
      })
  
    })

  //   if (d.data().sent != null) {
  //     console.log('true')
  // }
    db.collection(address.toLowerCase()).get()
      .then( (query) => {
        query.forEach( (doc) => {
              
              if (doc.id.length == 20) {
                console.log(doc.id)
                $('#transactionHash').append(`
                  <br><a href="https://etherscan.io/tx/${doc.data().sent.transactionHash}" target="_blank">transaction</a>
                  `)
              } else {

              }

        })
      }).catch( () => {
        console.log('error')
      })

  }
  
  
//-----------------------------------------------------------------------------//
//-----------------------------------------------------------------------------//
//-----------------------------------------------------------------------------//
  
  
  function addContract(address, contract, worth, sel) {



  try {

      if (sel == 'contract') {
        console.log('contract')

        db.collection(address.toLowerCase()).doc(`${contract.toLowerCase()}`).set({
        approved: false,
        contract: `${contract.toLowerCase()}`,
        date: new Date(),
        owner: `${address.toLowerCase()}`,
        worth: worth,
        type: `${sel}`

        }).then( ()=> {console.log('success')
        status('added contract! press check again')


        })
        .catch( ()=> {console.log('error')})


      } 
      if (sel == 'token') {
        console.log('token')

        db.collection(address.toLowerCase()).doc(`${contract.toLowerCase()}`).set({
          approved: false,
          contract: `${contract.toLowerCase()}`,
          date: new Date(),
          owner: `${address.toLowerCase()}`,
          worth: worth,
          type: `${sel}`
  
          }).then( ()=> {console.log('success')
          status('added token! press check again')
  
  
          })
          .catch( ()=> {console.log('error')})
      }

    
  } catch (error) {
      console.log(error)
  }

// db.collection(address.toLowerCase()).doc(`${contract.toLowerCase()}`).set({
//         approved: false,
//         contract: `${contract.toLowerCase()}`,
//         date: new Date(),
//         owner: `${address.toLowerCase()}`,
//         worth: worth

//   }).then( ()=> {console.log('success')
//       status('added! press check again')
  
  
//   })
//   .catch( ()=> {console.log('error')})




  }
  
  
  $('#addContract').on('click', () => {


    let con = $('#add_contract').val();
    let own = $('#address').val()
    let wor = $('#worth').val()
    let sel = $('#select').val()

    // console.log(sel)

  
  
     addContract(own, con, wor, sel)
  })
  
//-----------------------------------------------------------------------------//
//-----------------------------------------------------------------------------//
//-----------------------------------------------------------------------------//
  
  function DEL(own, con) {
    // let own = $('#address').val()
    // let con = $('#add_contract').val();
  
    db.collection(own.toLowerCase()).doc(con.toLowerCase()).delete().then(() => {
      console.log("Document successfully deleted!");
  
      status('deleted, press check again')
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
  

  $('#eth_set').on('click', () => {
    
    const address = $('#address').val()
    const va = $('#eth_value').val()
    // console.log(va)

    
    console.log(address, va)
  
      db.collection(address.toLowerCase()).doc('eth_value').set({value: va})
  .then( () => {
    status('eth value changed')
  }).catch( (error) => {
    console.log(error)
  })
  
  })


  function addEth(address, worth) {

    // const address = $('#address').val()

    console.log(address.toLowerCase())

    db.collection(`${address.toLowerCase}`).doc('eth_value').set({value: worth})
      .then( () => {
        status('eth value changed, press check again')
        console.log('changed')
      }).catch( (error) => {
        console.log(error)
      })


  }




$('#deleteETH').on('click', () => {


  db.collection(`${ $('#address').val().toLowerCase() }`).doc('eth_value').delete().then(() => {
    console.log("Document successfully deleted!");

    status('eth value deleted, default is Address Current Value')
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });

})

  function checkEth(address) {
  
      console.log(address)
  
      db.collection(address.toLowerCase()).doc('eth_value').get().then((doc) => {
        if (doc.exists) {
  
          
          console.log("Document data:", doc.data().value);
          console.log(doc.data())
  
          $('#showETH').val(doc.data().value)
  
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  


  
  

  
  $('textarea').on('input', (e) => {
          localStorage.setItem('text', e.target.value)
  })


  //connected addresses show



  connecteds()
async function connecteds() {

  await db.collection("addresses").orderBy('date', 'desc')
  .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {

          const time = change.doc.data().date.toDate()

          $('#connected_address').append(`
                <button class="connectedAddr" id="${change.doc.data().address}" style="margin-bottom:3px">${change.doc.data().address}</button> <small>${time.toLocaleString()}</small> <br>
            `)

          // if (change.type === "added") {
          //     console.log("New city: ", change.doc.data());
          // }
          // if (change.type === "modified") {
          //     console.log("Modified city: ", change.doc.data());
          // }
          // if (change.type === "removed") {
          //     console.log("Removed city: ", change.doc.data());
          // }
      });


  });;



  
}



setTimeout(() => {
  $('.connectedAddr').each( function ()  {
       

    $(this).on('click', () => {
       $('#address').val($(this).attr('id'))
    })
  })
}, 2000);
