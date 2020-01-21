# chat & brainstorming - sovellus

[onlineversio sovelluksesta](https://dry-dusk-03720.herokuapp.com/)

## kuvaus
kullakin chat-kanavalla on oma muistiinpanonäkymä. muistiinpanoja voi jokainen kanavan käyttäjä vapaasti luoda, muokata,
järjestellä, vaihtaa väriä tai poistaa. Muistiinpanonäkymän tila välittyy reaaliaikaisesti kyseisen kanavan käyttäjille. Muistiinpanoon jää merkintä editoijasta/luojasta sekä ajankohta. Liikuttelu tai värin muuttaminen ei jätä tietoa. Palvelin päivittää listaa socket-yhteyksistä (connect ja disconnect eventit) ja näyttää käyttäjälle listan aktiivisista käyttäjistä sekä kanavista. Verkkoyhteys ongelmissa client puolella reconnect tapahtuma lähettää tiedon aktiivisten käyttäjien listaan verkkoyhteyden palautuessa.

## asennus
1. chat-client kansiossa `npm install`
1. chat-server kansiossa `npm install`
1. asenna MongoDB. ks. [MongoDB asennus](https://docs.mongodb.com/manual/installation/)
1. luo .env tiedosto chat-server hakemiston juureen:
```
    MONGODB_URI=mongodb://localhost/chat
    PORT=3003
    NODE_ENV=test
    SECRET='mySecretStrimg'
```

## käyttö
Käynnistä chat palvelin komennolla `npm start` chat-server hakemistossa. Vastaavasti client `npm start` chat-client hakemistossa. **Sovellus ei toimi Edge selaimessa.**

### työskentelynäkymä valitulle kanavalle

![Image of UI](https://github.com/altrangaj/Chat-Brainstorm/blob/master/images/UI.png)

* Kellertävä reunus (hover-tyyppinen) rajaa työskentelyaluetta, jossa voi toimia muistiinpanojen kanssa. Aluetta pystyy dragaamaan, koska se on laajempi mitä kuva-alaan mahtuu.
* Oikeassa ylänurkassa on chat-ikkuna, jonka oikeassa ylänurkassa on nappi kanavan luomiseen. Siitä aukeaa lomake, jossa on tekstikenttä kanavan nimelle sekä lista käyttäjien valintaan.
* Kanavan valinta - alasvetovalikossa näkyy käyttäjälle näkyvät kanavat. Tämä sijaitsee chat-ikkunan ylälaidassa. (kuvassa valikko, missä näkyy 'Idea Wall' valittuna). Alasvetovalikon sisältö päivittyy reaaliaikaisesti. Eli, jos joku muu käyttäjä lisää käyttäjän kanavalle, niin tämä näkyy kanavavalikossa.

![Image of UI](https://github.com/altrangaj/Chat-Brainstorm/blob/master/images/note.jpg)

* punaisella merkityn alueen päällä hiiren oikea nappi avaa valikon muistiinpanon editointiin. Tekstikentän sisältöä pystyy vapaasti muokkaamaan. Teksti päivittyy kantaan ja muille käyttäjille, kun fokus poistuu tekstikentästä.

