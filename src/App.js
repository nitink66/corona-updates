import React ,{ Component } from 'react';
import './App.css';
import Axios from 'axios';
import './style.css'


class App extends Component{
  constructor(props){
    super(props);
    this.getCountryData =this.getCountryData.bind(this);
  }
    state ={
      confirmed:0,
      recovered:0,
      deaths:0,
      countries:[]
    }


componentDidMount(){
    this.getData();
}

async getData(){
  const respApi = await Axios.get("https://covid19.mathdro.id/api");
  const respCountries = await Axios.get("https://covid19.mathdro.id/api/countries");
  const countries = respCountries.data.countries;
  this.setState({
    confirmed: respApi.data.confirmed.value,
    recovered: respApi.data.recovered.value,
    deaths: respApi.data.deaths.value,
    countries
  });
}

async getCountryData(e){
  if(e.target.value === "WorldWide"){
    return this.getData();
  }
  try{
  const respCountry = await Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
 this.setState({
  confirmed: respCountry.data.confirmed.value,
  recovered: respCountry.data.recovered.value,
  deaths: respCountry.data.deaths.value,
 })
}
  catch(err){
    if(err.response.status === 404)
    this.setState({ 
      confirmed: "No tests has been conducted",
      recovered: "No data Found",
      deaths: "No Data Found"
     })
  }
}

renderCountryOptions(){
  return this.state.countries.map((country,i)=>{
      return <option key={i}>{country.name}</option>
  });
}


    render(){
        return (
            <div>
                <nav className="zone blue sticky">
      <ul className="main-nav">
          <li><a href="">About</a></li>
          <li><a href="https://github.com/nitink66">GitHub</a></li>
          <li><a href="https://www.instagram.com/rather_be_nitin/">Connect</a></li>
          <li className="push"><a href="mailto:nitink61996@gmail.com">Contact</a></li>
  </ul>
  </nav>
        <div className="container1">
            <img></img>
          </div>
             <h1 className="heading">Corona Global Updates</h1>
             <br></br>
             <p>Last Updated { Date() }</p>
              <select className="dropdown" onChange={this.getCountryData}>
                <option>WorldWide</option>
                {this.renderCountryOptions()}

              </select>
              <p> By default the WorldWide reports is being displayed</p>
              <p>*select the country to view the Updates about the virus infection/recovery</p>
      <div className="flex">
        <div className="box confirmed">
              <h2 className="case">Confirmed Cases</h2>
              <i className="fas fa-user-injured fa-6x"></i>
            <h3 className="case1">{this.state.confirmed}</h3>
        </div>

        <div className="box recovered">
        <h2 className="case">Recovered Cases</h2>
        <i className="fas fa-heartbeat fa-6x"></i>
            <h3>{this.state.recovered}</h3>
        </div>

        <div className="box deaths">
          <h2 className="case">Deaths Cases</h2>
          <i className="fas fa-radiation-alt fa-6x"></i>
            <h3>{this.state.deaths}</h3>
        </div>
        </div>
        <p></p>
        <p> Note :
         All data is being Served by John Hopkins University CSSE </p>

         <p>API LICENSED TO MIT <span> &copy;</span> </p>

         <p>Developed by Nitin &copy;</p>
         
         <a className="insta" href="https://www.instagram.com/rather_be_nitin/"><i className=" fab fa-instagram fa-4x grow"></i></a>
         <a className="insta" href="https://github.com/nitink66"><i className="fab fa-github fa-4x"></i></a>
         
        </div>
            
    );} 

   }

export default App;


 