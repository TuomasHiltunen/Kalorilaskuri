import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import firebase, { provider, auth } from './firebase';

import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Items from './components/Items/Items';
import Settings from './components/Settings/Settings';
import Stats from './components/Stats/Stats';
import AddItem from './components/AddItem/AddItem';
import EditItem from './components/EditItem/EditItem';
import Content from './components/Content/Content';
import Button from './components/buttons';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user: null,
      error: null 
    }
    // Kerrotaan että käytetään firebase tietokantaa
    this.dbRef = firebase.firestore();

    //Kytketään this sana, jottai sitä voidaan käyttää funktioissa
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this)
  }

  //kutsutaan kun komponentti on renderöity ensimmäisen kerran
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState ({
          user: user
        });

        //Luodaan viittaus käyttäjän dataan joka on kantaan tallennettu
        this.refData = this.dbRef.collection("users").doc(user.uid).collection('data');
        //Järjestetään data päivämäärän mukaan
        
        //Ladataan firebasesta sinne tallennetut tiedot
        //Kun dataan tapahtuu muutoksia snapshot käsittelijä saa firebasen datan parametrina
        //Käsittelee datan ja laittaa sen uuteen taulukkoon
        this.unsubscribe = this.refData.orderBy("paiva", "desc").onSnapshot((docs) => {
          let data = [];
          docs.forEach((doc) => {
            let docdata = doc.data();
            data.push(docdata);
          });
          //Päivitetään snapshotista saatu data state muuttujaan
          this.setState({ 
            data: data
          });
        });
      }
    });  
  }

  handleFormSubmit(newdata) {
    //Lisää formin tiedot kantaan
    this.refData.doc(newdata.id).set(newdata)
  }

  handleDeleteItem(id) {
    //Käytetään refdata viittausta firebase tietokannan dokumenttiin jolle annetaan delete toiminto
    this.refData.doc(id).delete().then().catch(error => {console.error("Virhe tietoa poistettaessa: ", error)})
  }

  login(){
    //Kirjaudutaan popup ikkunassa
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user: user,
        error: null
      });
    }).catch((error) => {
      const errorMessage = error.message;
      this.setState ({
        error: errorMessage
      })
    });
  }

  logout() {
    this.unsubscribe();
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
      this.refData = null;
    });
  }

  render (){
    //jos user muuttujaa ei oo määritelty niin renderöidään kirjaudu valikko
    if (!this.state.user) {
      return (
        <Router>
          <div className="App"> 
            <Header />
            <Content>
              <div className="App__etusivu">
              <p>Et ole vielä kirjautunut sisäään.</p>
              <p><Button primary onClick={this.login}>Kirjaudu sisään</Button></p>
              {this.state.error?<p>{this.state.error}</p>:null }
              </div>
            </Content>
           <Menu />
        </div>
        </Router>
      );
    }


    // route edit:ssä välitetään id ja data propsina
  return (  
    <Router>     
        <div className="App"> 
          <Header />         
          <Route path="/" exact render={() => <Items data={this.state.data} />} />
          <Route path="/stats" render={() => <Stats data={this.state.data}/> } />
          <Route path="/settings" render={() => <Settings onLogout={this.logout}
                                                          user={this.state.user} /> } />
          <Route path="/add" render={() => <AddItem onFormSubmit={this.handleFormSubmit}/>} />
          <Route path="/edit/:id" render={(props) => <EditItem data={this.state.data}
                                                               onFormSubmit={this.handleFormSubmit}
                                                               onDeleteItem={this.handleDeleteItem}
                                                                {...props} /> } />
          <Menu />
        </div>
    </Router>
  );
}
}

export default App;

          
