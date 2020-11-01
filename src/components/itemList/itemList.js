import React, { Component, useEffect, useState } from "react";
import Loader from "../loader";
import "./itemList.css";
import PropTypes from "prop-types";


class ItemList extends Component {
  renderItems = (arr) => {
    const items = arr.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });

    return items;
  };

  render() {
    const {data} = this.props
    const characters = this.renderItems(data);

    return <ul className="item-list list-group">{characters}</ul>;
  }
}

ItemList.defaultProps = {
  onItemSelected: () => {},
};

ItemList.propTypes = {
  onItemSelected: PropTypes.func,
};

const withData = (View) => {
  return function(props) {

    const [data, setData] = useState([])

    useEffect(() => {
      props.getData()
        .then((data) => {
        setData(data)
      });
    }, [])

  
    if (!data) {
      return <Loader />;
    }

      return (
        <View {...props} data={data}/>
      )
    }
  };

export default withData(ItemList);
