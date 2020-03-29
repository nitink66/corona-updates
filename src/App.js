import React ,{ Component } from 'react';
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
  const countries = respCountries.data.countries.map(country => {
    return country.name;
  });
  this.setState({
    confirmed: respApi.data.confirmed.value,
    recovered: respApi.data.recovered.value,
    deaths: respApi.data.deaths.value,
    countries:countries
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
      return <option key={i}>{country}</option>
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
            <img alt=""></img>
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

              <article className="bg-white mw5 ba b--black-100 mv4 news">
        <div className="pv2 ph3">
          <h1 className="f6 ttu tracked">Daily News Co.</h1>
        </div>
        <img src="https://www.gstatic.com/youtube/img/promos/growth/7f32b5b035a135015508e87bf6ff92d9d98d45b9cc9fb53f28be04732ffd547b_384x384.png" 
        className="w-100 db" alt="tabby"/>
        <div className="pa3">
          <h5>COVID-19</h5>
          <h5 className="f6 lh-copy measure mt2 mid-gray">Get the latest info from the MoHFW about COVID-19</h5>
          <a href="https://www.mohfw.gov.in/" className="link lh-title light-blue pv2 db">Learn More</a>
          <a href="https://main.mohfw.gov.in/" className="link lh-title light-blue">Main site</a>
          
        </div>
      </article>
            
            <div className="container11">
            <h1 className="tc">Advise for Public</h1>
        <iframe width="363" height="345" src="https://www.youtube.com/embed/bPITHEiFWLc" frameBorder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen></iframe>
        <p>Official WHO Youtube Video</p>
        </div>

        </div>
        <div className="basic tc">
          <h1 className="tc">Basic protective measures against the new coronavirus</h1>
          <h3><strong>Wash your hands frequently</strong></h3>
          <p>Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water.</p>
          <p><strong>Why?</strong> Washing your hands with soap and water or using alcohol-based hand rub kills viruses that may be on your hands.</p>
          <br></br>
          <br></br>

          <h3><strong>Maintain social distancing</strong></h3>
          <p>Maintain at least 1 metre (3 feet) distance between yourself and anyone who is coughing or sneezing.</p>
          <p><strong>Why?</strong> When someone coughs or sneezes they spray small liquid droplets from their nose or mouth which may contain virus. </p>
         <p> If you are too close, you can breathe in the droplets, including the COVID-19 virus if the person coughing has the disease.</p>
          <br></br>
          <br></br>

          <h3><strong>Avoid touching eyes, nose and mouth</strong></h3>
          <p><strong>Why?</strong> Hands touch many surfaces and can pick up viruses. Once contaminated, hands can transfer the virus to your eyes, nose or mouth. </p>
          <p>From there, the virus can enter your body and can make you sick.</p>
          <br></br>
          <br></br>


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


 