# chat & brainstrorming - sovellus

[online versio sovelluksesta](https://dry-dusk-03720.herokuapp.com/)

## kuvaus
kullakin chat-kanavalla on oma muistiinpanonäkymä. muistiinpanoja voi jokainen kanavan käyttäjä vapaasti luoda, muokata tekstisisältöä,
liikutella, vaihtaa väriä tai poistaa. Muistiinpanonäkymän tila välittyy reaaliaikaisesti kyseisen kanavan käyttäjille.

##### muita ominaisuuksia
* kirjautuminen ja rekisteröityminen
* tieto aktiivisista käyttäjistä (käyttäjälista päivittyy myös verkkoyhteysongelmissa)
* kanavan luominen
* muistiinpanoaluetta (working area) voi dragata. Tilan leveys on 2000px
* kello
* muistiinpanoon jää merkintä editoijasta/luojasta sekä ajankohta. Liikuttelu tai värin muuttaminen ei jätä tietoa
* chat
* uloskirjautuminen

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
Käynnistä chat palvelin komennolla `npm start` chat-server hakemistossa. Vastaavasti client `npm start` chat-client hakemistossa. Mikäli testaat sovellusta useammalla käyttäjällä, tarvitset kullekkin käyttäjälle oman selaimen. **Sovellus ei toimi Edge selaimessa.** Uusi käyttäjä ei kuulu mihinkään kanavaan, joten kanavan valinta - alasvetovalikko ei ole näkyvissä.

### työskentelynäkymä valitulle kanavalle

![Image of UI](https://github.com/altrangaj/FULLSTACK_HARJOITUSTYO/blob/master/images/UI.png)

* Ohut sininen reunus (hover-tyyppinen) rajaa työskentelyaluetta, jossa voi toimia muistiinpanojen kanssa. Aluetta pystyy dragaamaan, koska se on laajempi mitä kuva-alaan mahtuu. (Tosin siinä on bugi. Kun tooltip katoaa näkyvistä, se keskeyttää dragaamisen. Kannattaa klikata taka-alaa ennen työskentelyalueen liikuttamista, niin tooltipistä pääsee eroon.)
* Oikeassa ylänurkassa on chat-ikkuna, jonka oikeassa ylänurkassa on nappi kanavan luomiseen. Siitä aukeaa lomake, jossa on tekstikenttä kanavan nimelle, multiselect-search-dropdown tyyppinen lista käyttäjien valintaan sekä create että cancel napit.
* Kanavan valinta - alasvetovalikossa näkyy käyttäjälle näkyvät kanavat. Tämä sijaitsee chat-ikkunan ylälaidassa. (kuvassa valikko, missä näkyy 'Idea Wall' valittuna)
* Vasemmassa alanurkassa on uloskirjautuminen.

![Image of UI](https://github.com/altrangaj/FULLSTACK_HARJOITUSTYO/blob/master/images/note.jpg)

* punaisella merkityn alueen päällä hiiren oikea nappi avaa valikon muistiinpanon editointiin. Tekstikentän sisältöä pystyy vapaasti muokkaamaan. Teksti päivittyy kantaan ja muille käyttäjille, kun fokus poistuu tekstikentästä.

