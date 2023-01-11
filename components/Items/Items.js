import React from 'react';

import { Link } from 'react-router-dom'

import Food from '../Food/Food';
import Content from '../Content/Content';
import { FloatingButton } from '../buttons';

function Items(props) {

    let rows = props.data.map(invoice => { // mapataan data taulukon yksittäinen alkio kerrallaan ja laitetaan se data invoice muuttujaan
        return (                            // Viedään propseilla Food componentille
            <Food data={invoice} key={invoice.id} />
        );    
      }
    );

    return (
          <Content> 
              <div style={{paddingBottom: '4rem'}}>
              { rows }
              </div>
              <Link to="/add"><FloatingButton secondary></FloatingButton></Link>       
          </Content>         
    );
  }



  export default Items;