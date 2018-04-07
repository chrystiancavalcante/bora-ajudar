//testando 
const request = require('request-promise')
const parse = require('xml2js').parseString

const email='chrystiancavalcante@gmail.com'
const token ='C10698F02E4645638F287043EC66A6D5'


//checkout
/*request({
  uri: 'https://ws.pagseguro.uol.com.br/v2/checkout',
  method: 'POST',
  form: {
      token: token,
      email: email,
      currency: 'BRL',
      itemId1: 'idCampanha',
      itemDescription1: 'Doação',
      itemQuantily: '1',
      itemAmount1: '2,00'
  },
  headers: {
      'Content-type': 'application/x-www-urlencoded; charset=UTF-8'
  }
})
.then( data =>{
  parse(data, (err, json) => {
      console.log(json.checkout.code[0])
  })
})*/
//https://ws.pagseguro.uol.com.br/v2/checkout/payment.html?code=


//notificação de retorno de transação
const notificationCode = '16DAD7-F881F581F58B-F004753HJS'
const consultaNotificacao = 'https://ws.pagseguro.uol.com.br/v2/checkout/payment.html?code=127273664635363636363DDDFT'
//url de notificação do pagseguro
Request(consultaNotificacao+notificationCode+'?token='+token+'&email='+email)
.then( notificationXML => {
    parse(notificationXML, (err, transactionJson) => {
        const transaction = transactionJson.transaction
        const status = transaction.status[0]
        const amount = transaction.grossAmount[0]
        const campanha = transaction.items[0].item[0].id[0]
        console.log(status, amount, campanha)

    })
})