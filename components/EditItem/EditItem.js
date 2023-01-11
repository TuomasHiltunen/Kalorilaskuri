import React from 'react';
import Content from '../Content/Content';

import ItemForm from '../ItemForm/ItemForm'


import './EditItem.css';

function EditItem(props) {

    //Haetaan datasta se itemi jonka id vastaa props match id:tä
    const index = props.data.findIndex(item => item.id === props.match.params.id);

    //itemData muuttujaan haetaan oikea data indexillä
    let itemData = props.data[index];

    return (
      <Content>
        <div className="edititem">   
          <h2>Aterian muokkaaminen</h2>
          <ItemForm  onFormSubmit={props.onFormSubmit} data={itemData} onDeleteItem={props.onDeleteItem}/>
        </div>
      </Content>   
    );
  }
  
  export default EditItem;