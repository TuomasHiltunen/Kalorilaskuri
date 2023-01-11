import React, { Component } from 'react';
import './Counter.css';

class Counter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      paino: 0,
      ika: 0,
      pituus: 0,
      kalorit: 0,
      sukupuoli: "",
      aktiivisuus: ""
      
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value    });
  }

  handleChange(event) {
    this.setState({
      sukupuoli: event.target.value
    });
  }
  
  handleChange2(event) {
    this.setState({
      aktiivisuus: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let x;
    if (this.state.sukupuoli === "nainen" && this.state.aktiivisuus === "aktiivisuus") {
     x = (447.593 + ((9.247 * this.state.paino) + (3.098 * this.state.pituus) - (4.330 * this.state.ika)) * 1.2 ).toFixed(0)
     this.setState({kalorit: x })
    } 
    else if (this.state.sukupuoli === "nainen" && this.state.aktiivisuus === "aktiivisuus1") {
      x = (447.593 + ((9.247 * this.state.paino) + (3.098 * this.state.pituus) - (4.330 * this.state.ika)) * 1.5 ).toFixed(0)
      this.setState({kalorit: x })
    }
    else if (this.state.sukupuoli === "nainen" && this.state.aktiivisuus === "aktiivisuus2") {
      x = (447.593 + ((9.247 * this.state.paino) + (3.098 * this.state.pituus) - (4.330 * this.state.ika)) * 1.7 ).toFixed(0)
      this.setState({kalorit: x })
    }
    else if (this.state.sukupuoli === "nainen" && this.state.aktiivisuus === "aktiivisuus3") {
      x = (447.593 + ((9.247 * this.state.paino) + (3.098 * this.state.pituus) - (4.330 * this.state.ika)) * 1.9 ).toFixed(0)
      this.setState({kalorit: x })
    }
    else if (this.state.sukupuoli === "nainen" && this.state.aktiivisuus === "aktiivisuus4") {
      x = (447.593 + ((9.247 * this.state.paino) + (3.098 * this.state.pituus) - (4.330 * this.state.ika)) * 2.2 ).toFixed(0)
      this.setState({kalorit: x })
    }


    if (this.state.sukupuoli === "mies" && this.state.aktiivisuus === "aktiivisuus") {
     x = (88.362 + ((13.397 * this.state.paino) + (4.799 * this.state.pituus) - (5.677 * this.state.ika)) * 1.2).toFixed(0)
     this.setState({kalorit: x })
    }
    else if (this.state.sukupuoli === "mies" && this.state.aktiivisuus === "aktiivisuus1") {
      x = (88.362 + ((13.397 * this.state.paino) + (4.799 * this.state.pituus) - (5.677 * this.state.ika)) * 1.5).toFixed(0)
      this.setState({kalorit: x })
    }
     else if (this.state.sukupuoli === "mies" && this.state.aktiivisuus === "aktiivisuus2") {
      x = (88.362 + ((13.397 * this.state.paino) + (4.799 * this.state.pituus) - (5.677 * this.state.ika)) * 1.7).toFixed(0)
      this.setState({kalorit: x })
    }
    else if (this.state.sukupuoli === "mies" && this.state.aktiivisuus === "aktiivisuus3") {
      x = (88.362 + ((13.397 * this.state.paino) + (4.799 * this.state.pituus) - (5.677 * this.state.ika)) * 1.9).toFixed(0)
      this.setState({kalorit: x })
    }
    else if (this.state.sukupuoli === "mies" && this.state.aktiivisuus === "aktiivisuus4") {
      x = (88.362 + ((13.397 * this.state.paino) + (4.799 * this.state.pituus) - (5.677 * this.state.ika)) * 2.2).toFixed(0)
      this.setState({kalorit: x })
    }

    return (
   <h1>{x}</h1>
);

    
  }
   
  render (){

    let kalorityht = this.props.data.reduce((kalorityhteensa, ateria) => kalorityhteensa + ateria.kalorit, 0);


    let pudotuskalorit;
    if(this.state.kalorit === 0){
      pudotuskalorit = 0;
    } else {
      pudotuskalorit = this.state.kalorit - 300
    }
   

    return (
      <form onSubmit={this.handleSubmit}>
      
      <div className="counterform"> 
        <div className="counterform__radio">
          <div>
            <label htmlFor="nainen"></label>
            <input type="radio"  
                   value="nainen" 
                   onChange={this.handleChange} 
                   checked={this.state.sukupuoli === "nainen"}/> Nainen
          </div> 
          <div>
            <label htmlFor="mies"></label>
            <input type="radio"
                   value="mies" 
                   onChange={this.handleChange}
                   checked={this.state.sukupuoli === "mies"} /> Mies
          </div>
        </div>
        
        <div className="counterform__tiedot"> 
          <div>
            <label htmlFor="paino">Paino:</label>
            <input type="text" name="paino" size="1" onChange={this.handleInputChange} />
          </div>
          <div>
            <label htmlFor="ika">Ikä:</label>
            <input type="text" name="ika" size="1" onChange={this.handleInputChange} />
          </div>
          <div>
            <label htmlFor="pituus">Pituus:</label>
            <input type="text" name="pituus" size="1" onChange={this.handleInputChange} />
          </div>
        </div> 
    </div>
    <div className="counterform__aktiivisuus">
          <div>
            <label htmlFor="aktiivisuus"></label>
            <input type="radio"  
                   value="aktiivisuus" 
                   onChange={this.handleChange2} 
                   checked={this.state.aktiivisuus === "aktiivisuus"}/>
                   Ei lainkaan aktiivinen
          </div> 
          <div>
            <label htmlFor="aktiivisuus1"></label>
            <input type="radio"  
                   value="aktiivisuus1" 
                   onChange={this.handleChange2} 
                   checked={this.state.aktiivisuus === "aktiivisuus1"}/>
                   Satunnaisesti aktiivinen
          </div> 
          <div>
            <label htmlFor="aktiivisuus2"></label>
            <input type="radio"
                   value="aktiivisuus2" 
                   onChange={this.handleChange2}
                   checked={this.state.aktiivisuus === "aktiivisuus2"} />
                   Liikkuminen säännöllistä
          </div>
          <div>
            <label htmlFor="aktiivisuus3"></label>
            <input type="radio"  
                   value="aktiivisuus3" 
                   onChange={this.handleChange2} 
                   checked={this.state.aktiivisuus === "aktiivisuus3"}/>
                   Arkiaktiivinen kuntourheilija
          </div> 
          <div>
            <label htmlFor="aktiivisuus4"></label>
            <input type="radio"
                   value="aktiivisuus4" 
                   onChange={this.handleChange2}
                   checked={this.state.aktiivisuus === "aktiivisuus4"} />
                   Kovaa fyysistä työtä tekevä, erittäin paljon kuntoileva
          </div>
        </div>   
        <div className="counterform__kalorit">    
          <div className="counterform__submit">
            <button type="submit" className="btn">Laske</button>
          </div>
          <div>
            Säilytät painon:{this.state.kalorit}
          </div>
          <div>
           Pudotat painoa: {pudotuskalorit}
          </div>
          <div>
           Syödyt kalorit: {kalorityht}
          </div> 
        </div>        
  </form> 
    );
  }
}
  export default Counter;