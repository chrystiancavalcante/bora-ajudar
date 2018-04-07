const functions = require('firebase-functions')
const admin = require('firebase-admin')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//admin.inicializeApp(functions.config().firebase)
admin.inicializeApp

const request = require('request-promise')
const parse = require('xml2js').parseString

const email = 'chrystiancavalcante@gmail.com'
const token = 'C10698F02E4645638F287043EC66A6D5'
const checkoutUrl = 'https://ws.pagseguro.uol.com.br/v2/checkout/payment.html?code='

app.use(bodyParser.json())
app.use(bodyParser.urlencoder({ extended: true }))

app.get('/', (req, res) => {
    admin
        .database()
        .ref('/campanhas/' + campanha)
        .once('value')
        .then(value => {
            const campanhaAtual = value.val()
            const doado = parseFloat(campanhaAtual.doado) + parseFloat(amount)
            campanhaAtual.doado = doado.toFixed(2)
            admin
                .database()
                .ref('/campanhas/' + campanha)
                .set(campanhaAtual)
                .then(value => {
                    res.send(campanhaAtual)
                })

        })

    //res.send('BoraAjudar Server')
})

app.post('/donate', (req, res) => {
    request({
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
        .then(data => {
            parse(data, (err, json) => {
                res.send({
                    url: checkoutUrl + json.checkout.code[0]

                })
            })
        })

})

app.post('/webhook', (req, res) => {
    const notificationCode = req.body.notificationCode
    const consultaNotificacao = 'https://ws.pagseguro.uol.com.br/v2/checkout/payment.html?code=127273664635363636363DDDFT'
    //url de notificação do pagseguro
    Request(consultaNotificacao + notificationCode + '?token=' + token + '&email=' + email)
        .then(notificationXML => {
            parse(notificationXML, (err, transactionJson) => {
                const transaction = transactionJson.transaction
                const status = transaction.status[0]
                const amount = transaction.grossAmount[0]
                const campanha = transaction.items[0].item[0].id[0]
               
                // atualizando a campanha
                admin
                    .database()
                    .ref('/campanhas/' + campanha)
                    .once('value')
                    .then(value => {
                        const campanhaAtual = value.val()
                        const doado = parseFloat(campanhaAtual.doado) + parseFloat(amount)
                        campanhaAtual.doado = doado.toFixed(2)
                        admin
                            .database()
                            .ref('/campanhas/' + campanha)
                            .set(campanhaAtual)
                            .then(() => {
                                res.send('ok')
                            })

                    })
                    // Salvando a transação
                    admin
                    .database()
                    .ref('/transactions/'+transaction.code[0])
                    .set(transaction)
                    .then(() =>{
                        
                    })

            })
        })
})

exports.api = functions.https.onRequest(app)


