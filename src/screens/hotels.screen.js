import React, { Component } from 'react';
import HotelComponent from '../components/Hotel.component';
import { data } from '../consts';
export default class App extends Component {

  state = {
    data,
    loading: true,
    log: null,
    name: '',
    stars: null,
    loadBackup: false
  }

  componentDidMount() {
    this.loadData('http://localhost:8080/hotels');
  }

  loadData = (endpoint) => {
    fetch(encodeURI(endpoint))
      .then(data => {
        data.json().then(data => {
          console.log('data:', data)
          this.setState({ data: data, loading: false })
        })
          .catch(e => {
            console.log('1e : ', e)
            this.setState({ log: 'Type json error', loading: false, loadBackup: true })
            this.loadBackup();
          })
      }).catch(e => {
        console.log('2e : ', e)
        this.setState({ log: 'Network error', loading: false, loadBackup: true })
        this.loadBackup();
      })
  }

  loadBackup = () => {
    this.setState({ data });
    setTimeout(() => {
      this.setState({ loadBackup: false });
    }, 1500);
  }

  ChangeStars = (stars) => {
    if ((stars.target.value <= 5) && (stars.target.value >= 0)) {
      this.setState({ stars: stars.target.value })
    }
  }

  mountHotel = (hotel, k) => {
    return < HotelComponent key={k} hotel={hotel} />
  }

  initFilter = e => {
    e.preventDefault();
    const { name, stars } = this.state;
    if (name || stars) {
      this.loadData(`http://localhost:8080/filter_hotels?name=${name}&&stars=${stars}`);
    } else alert('You must select at least one filter')
  }

  render() {

    const { data, loading, loadBackup } = this.state;

    if (loadBackup) {
      return (
        <div>
          <h1>Load Backup, please wait ...  </h1>
        </div>
      );
    }

    if (loading) {
      return (
        <div>
          <h1>Cargando datos  </h1>
        </div>
      );
    }

    if (!data) {
      return (
        <div>
          <h1>Error {this.state.log} </h1>
        </div>
      );
    }

    return (
      <div style={{ padding: 20, margin: 20 }}>

        <div style={{
          flexDirection: 'row'
        }}>

          <form onSubmit={this.initFilter}>
            <div style={{
              flexDirection: 'row'
            }}>
              <p>Start : </p>
              <input type='number' value={this.state.stars} onChange={(stars) => this.ChangeStars(stars)} />
            </div>

            <div style={{
              flexDirection: 'row'
            }}>
              <p>Name : </p>
              <input type='text' value={this.state.name} onChange={(name) => this.setState({ name: name.target.value })} />
            </div>
            <button>
              Filter
          </button>
          </form>
        </div>

        <div>
          {
            data.map((hotel, k) => {
              return this.mountHotel(hotel, k)
            })
          }
        </div>

      </div>
    );
  }
}