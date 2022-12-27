import {LoggedSession} from "../object/LoggedSession.js"
import {User} from "../object/user.js"
import {database} from "../services/Database.js"

//funzione per comparare due oggetti che abbiano le chiavi nello stesso ordine con JSON.stringify
const isEqual = (first, second) => {
    return JSON.stringify(first) === JSON.stringify(second)
}

const testSave = async loggedSession => {
    if(await loggedSession.save())
        console.log('Inserito con successo oggetto con ip_address: ' + loggedSession.ipAddress)
    else (console.log("errore nell'inserimento"))

    await loggedSession.delete()
}

const testGetByIp = async loggedSession => {
    await loggedSession.save()

    const result = await loggedSession.getByIp(loggedSession.ipAddress)
    if(isEqual(result, loggedSession))
        console.log('Richiesto oggetto con ip_address: ' + loggedSession.ipAddress +
            ' e ritornato oggetto con ip_address: ' + result.ipAddress)

    await loggedSession.delete()
}

const testGetByUsername = async loggedSession => {
    await loggedSession.save()

    const result = await loggedSession.getByUsername(loggedSession.username)
    if(isEqual(result, loggedSession))
        console.log('Richiesto oggetto con username: ' + loggedSession.username +
            ' e ritornato oggetto con username: ' + result.username)

    await loggedSession.delete()
}

const testDeleteByIp = async loggedSession => {
    await loggedSession.save()

    //controllo che getByIp ritorni un oggetto identico a quello creato
    const result = await loggedSession.getByIp(loggedSession.ipAddress)
    if(isEqual(result, loggedSession)) console.log('Ritornato con successo oggetto con ip_address: ' + result.ipAddress)

    //elimino l'oggetto creato e controllo che getByIp non ritorni un risultato e quindi secondResult sia uguale a null
    await loggedSession.deleteByIp(loggedSession.ipAddress)
    const secondResult = await loggedSession.getByIp(loggedSession.ipAddress)
    if(secondResult === null) console.log('Rimosso con successo oggetto con ip_address: ' + loggedSession.ipAddress)
}

const testUpdateIp = async loggedSession => {
    await loggedSession.save()

    /* modifico il campo ip_address nel db e controllo che getByIp ritorni un oggetto simile a quello creato
    con il solo campo ip_address modificato */
    const newIp = '10.10.10.10'
    await loggedSession.updateIp(newIp, loggedSession.ipAddress)
    const secondResult = await loggedSession.getByIp(newIp)
    if(secondResult.ipAddress === newIp
        && secondResult.username === loggedSession.username
        && secondResult.accessDate === loggedSession.accessDate)
        console.log('Aggiornato con successo oggetto con ip_address: ' + loggedSession.ipAddress)

    await loggedSession.deleteByIp(newIp)
}

/* nei test passo come parametro l'oggetto da inserire nel db
 e che verrà rimosso alla fine del singolo test */
const main = async () => {
    await database.init()

    //inizializzo e inserisco nel db user di prova usato da tutti i metodi
    const user = new User('prova','pro','va','prova@prova.com')
    await user.save()

    await testSave(new LoggedSession('1.1.1.1','prova', '2022-11-13 07:00:00'))
    await testGetByIp(new LoggedSession('2.2.2.2', 'prova', '2022-08-30 09:00:00'))
    await testGetByUsername(new LoggedSession('3.3.3.3', 'prova', '2022-05-20 10:00:00'))
    await testDeleteByIp(new LoggedSession('4.4.4.4', 'prova', '2022-03-05 14:00:00'))
    await testUpdateIp(new LoggedSession('5.5.5.5', 'prova', '2022-06-07 13:00:00'))

    //rimuovo dal db user di prova usato da tutti i metodi
    await user.deleteByUserName(user.username)
    process.exit(0)
}

main().catch(e => {
    database.endConnection()
    console.error(e)
    process.exit(1)
})