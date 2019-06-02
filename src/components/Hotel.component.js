import React, { StatelessComponent, Component } from 'react'
const styles = {
  div1: {
    width: '40%',
    margin: 10,
    padding: 5,
    boxShadow: `1px 2px 1px #9E9E9E`,
  }
}

export default class HotelComponent extends Component {
  render() {
    const { hotel, key } = this.props;
    return (
      <div key={key}>
        <div style={styles.div1}>
          <img src="https://q-ec.bstatic.com/images/hotel/max1024x768/681/68184730.jpg" style={{ width: '100%' }} />
          <div style={{ padding: 2 }}>
            <h4><b>{hotel.name}</b></h4>
            <p>{hotel.stars}</p>
            <p>{hotel.price}</p>
            {
              hotel.amenities.map(amenities => {
                return <p>{amenities}</p>
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
