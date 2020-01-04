# chat & brainstrorming - sovellus

[online versio sovelluksesta](https://dry-dusk-03720.herokuapp.com/)

## kuvaus
kullakin chat-kanavalla on oma muistiinpanonäkymä. muistiinpanoja voi jokainen kanavan käyttäjä vapaasti luoda, muokata tekstisisältöä,
liikutella, vaihtaa väriä tai poistaa. Muistiinpanonäkymän tila välittyy reaaliaikaisesti kyseisen kanavan käyttäjille.

muita ominaisuuksia
* kirjautuminen ja rekisteröityminen
* tieto aktiivisista käyttäjistä
* kanavan luominen
* muistiinpanoaluetta (working area) voi dragata. Tilan leveys on 2000px
* kello
* muistiinpanoon jää merkintä editoijasta/luojasta sekä ajankohta. Liikuttelu tai värin muuttaminen ei jätä tietoa
* chat
* uloskirjautuminen

## asennus
1. chat-client kansiossa npm install
1. chat-server kansiossa npm install
1. asenna MongoDB. ks. https://docs.mongodb.com/manual/installation/
   1. Vinkki (Windows): `msiexec.exe /l*v mdbinstall.log  /qb /i mongodb-win32-x86_64-2012plus-4.2.0-signed.msi ADDLOCAL="ServerNoService,ServerService,Client,Router,Client,MonitoringTools,ImportExportTools,MiscellaneousTools"` Jostain syystä en onnistunut perus MongoDB installerilla saamaan kantaa toimintaan. Tuollaisella rimpsulla kyllä. +tarvittavat Windows päivitykset
   1. lisäksi kätevä Robo3T työkalu on hyvä asentaa kannan tarkasteluun/editointiin
1. luo .env tiedosto chat-server hakemiston juureen:
```
    MONGODB_URI=mongodb://localhost/chat
    PORT=3003
    NODE_ENV=test
    SECRET='mySecretStrimg'
```

## käyttö

![Image of UI] (https://raw.githubusercontent.com/altrangaj/FULLSTACK_HARJOITUSTYO/master/images/basicview.JPG)

