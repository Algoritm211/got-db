import React from "react";
import GotService from "../../services/gotService";
import ItemDetails, { Field } from "../itemDetails";

export default class HousesItem extends React.Component {
  gotService = new GotService();

  render() {
    return (
      <ItemDetails
        itemId={this.props.houseId}
        getItemData={this.gotService.getHouse}
      >
        <Field field="region" label="Region" />
        <Field field="words" label="Words" />
        <Field field="titles" label="Titles" />
        <Field field="ancestralWeapons" label="Ancestral Weapons" />
      </ItemDetails>
    );
  }
}
