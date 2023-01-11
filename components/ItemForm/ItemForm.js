import React from 'react';
import { withRouter } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import Button from '../buttons';

import './ItemForm.css'



class ItemForm extends React.Component {

    constructor(props) {
        super(props);
        
        const data = props.data ? props.data : {
          tyyppi: "Aamupala",
          ruoka: "",
          juoma: "",
          kalorit: 0,
          paiva: ""
        }

        this.state = {
            data: data
        };

        //Kytketään this sana, jottai sitä voidaan käyttää handle funktioissa
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }


    //Kutsutaan kun input kenttään tehdään muutos
    //Selvittää missä kentässä muutos tapahtu ja sijoittaa sen valuen state muuttujaan
    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'isGoing' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          data: {
              ...this.state.data,
              [name]: value 
          }   
        });
      }

      handleCancel(event) {
          event.preventDefault();
          this.props.history.goBack();
      }

      handleSubmit(event) {
          event.preventDefault(); // Estetään submit napin oletus toiminto
          let data = Object.assign({}, this.state.data); // Kopioidaaan state.data muuttujan tiedot data muuttujaan
          data.kalorit = parseFloat(data.kalorit); //Kerrotaan että kalorit on liukuluku tyyppinen
          data.id = data.id ? data.id : uuidv4(); //Varmistetaan onko id olemassa. Luodaan uusi jos ei ole
          this.props.onFormSubmit(data); //Tallennetaan uusi käyttäjän antama data firebase tietokantaan
          this.props.history.push("/"); // uudelleen ohjataan käyttäjä etusivulle
      }

      handleDeleteItem(event) {
        event.preventDefault();
        this.props.onDeleteItem(this.state.data.id);
        this.props.history.push("/");
      }

    render(){
        return (

        <form onSubmit={this.handleSubmit}>
      
        <div className="itemform">
        
          <div className="itemform__row">
            <div>
              <label htmlFor="tyyppi">Ateriatyyppi</label>
              <select name="tyyppi" defaultValue={'DEFAULT'} onChange={this.handleInputChange}>
              <option value="DEFAULT" disabled>Valitse... </option>
                <option value="Aamupala">Aamupala</option>
                <option value="Lounas">Lounas</option>
                <option value="Päivällinen">Päivällinen</option>
                <option value="Iltapala">Iltapala</option>
                <option value="Välipala">Välipala</option>
              </select>
            </div>
          </div>

          <div className="itemform__row">
            <div>
              <label htmlFor="ruoka">Ateria</label>
              <input type="text" name="ruoka" value={this.state.data.ruoka} onChange={this.handleInputChange} />
            </div>
            <div>
              <label htmlFor="juoma">Juoma</label>
              <input type="text" name="juoma"  value={this.state.data.juoma} onChange={this.handleInputChange} />
            </div>
          </div>

          <div className="itemform__row">    
            <div>
              <label htmlFor="kalorit">Kalorit</label>
              <input type="number" name="kalorit" value={this.state.data.kalorit} onChange={this.handleInputChange} />
            </div>
          </div>

          <div className="itemform__row">
            <div>     
              <label htmlFor="paiva">Päivämäärä</label>
              <input type="date" name="paiva" value={this.state.data.paiva} onChange={this.handleInputChange} />
            </div>
          </div>

            <div className="itemform__btn">
              <Button type="submit" primary>{this.state.data.id ? "Tallenna" : "Lisää"} </Button>
              <Button onClick={this.handleCancel}>Peruuta</Button>

              { this.props.onDeleteItem ?
               <Button onClick={this.handleDeleteItem}> Poista</Button> : "" }
            </div>

        </div>
        
        </form>
        );

    }
}

export default withRouter(ItemForm);