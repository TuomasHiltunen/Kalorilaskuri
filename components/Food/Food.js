import React from 'react';
import moment from 'moment';

import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { Link } from 'react-router-dom';

import './Food.css'

function Food(props) {

    let paiva = moment(props.data.paiva); // asennettu moment.js npm avulla helpottamaan päivämäärien käsittelyä

    return (
      
      <div className="ruokakortti">
        <div className="ruokakortti__paivamaara">{paiva.format("D.M.Y")}</div>
        <div className="ruokakortti__rivi">
          <div className="ruokakortti__ruoka">{props.data.tyyppi}</div>        
          <div className="ruokakortti__kalorit">Kalorit</div>
        </div>
        <div className="ruokakortti__rivi">
          <div className="ruokakortti__ruokalaji">{props.data.ruoka} </div> 
          <div className="ruokakortti__yhteensa">{props.data.kalorit} Kcal</div>
        </div> 
        <div className="ruokakortti__rivi">
        <div className="ruokakortti__juoma">{props.data.juoma}</div>
        </div>
        <div className="ruokakortti__nappi1">
        <div className="ruokakortti__nappi">
          <Link to={"/edit/" + props.data.id}><ArrowDropDown /> </Link>
        </div>
        </div>
      </div>
             
    );
  }

  export default Food;