
import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

//import Graph from './MultiLineChart';

import { Chart } from "react-google-charts";
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Gas from './components/Gas';

import Component2 from './components/Component2';

const LineData = [
  ['xyyyyyy', 'dogs'],[5.83,37.96494258214029],[4.49,45.851983972315004],[2.67,47.43624573979835],[3.33,55.391510721370224],[4.71,70.77457252106635],[2.99,79.64615921533625],[2.2800000000000002,78.40738706401547],[3.3000000000000003,93.67988274624574],[3.87,119.75989715673401],[3.11,112.20692727206401],[2.02,143.549992307082],[5.32,36.86335590986083],[4.09,47.195260869011726],[2.5100000000000002,49.79408322216054],[3.33,56.9847633128519],[6,72.00118486775584],[2.87,82.21128113469592],[1.99,77.53480566337186],[2.85,96.57404121804595],[2.67,116.010054385985],[2.69,120.391248070309],[1.9100000000000001,144.097058633481],[4.29,39.40742866090193],[3.97,46.92662061281259],[2.17,51.07646372421199],[3.81,58.410357211071705],[4.9,73.88602197000556],[2.83,83.39720710926423],[1.73,82.95402041101978],[2.88,98.48961106844496],[2.69,117.186429402873],[2.95,122.074938873146],[1.79,115.356733378962],[4.03,41.06034889392588],[4.24,48.39192818130165],[1.95,51.26190288909467],[4.17,59.00703322241356],[4.66,72.38951272593694],[2.61,83.92183163744811],[1.92,85.47493904436293],[3.1,98.90026499611139],[2.8000000000000003,115.499700938883],[2.65,126.515706780661],[1.74,119.65050452521601],[4.14,39.07757066382212],[4.3100000000000005,48.937605143043506],[2.43,50.00035587315905],[4.04,61.91330218500087],[4.58,72.9010704347924],[2.85,84.1324516518583],[1.92,85.34685973394137],[3.15,101.382337946254],[2.8000000000000003,117.237306831159],[2.64,125.205850388927],[1.75,128.649995063076],[4.8,37.9584375809268],[4.54,47.328945257028366],[2.46,48.68227266463562],[3.83,60.71320831892115],[4.59,75.26624638801161],[2.7800000000000002,84.13614210134367],[2.59,86.32493235724311],[2.98,103.69531632818399],[2.97,120.32366769789499],[2.4,127.55906993847901],[1.6300000000000001,137.664840053116],[4.63,37.54467901429023],[4.42,48.67484220880728],[2.95,49.6192145380505],[3.62,62.659860945323],[4.05,76.14145176256893],[2.84,84.31354724011268],[2.82,88.9386925930549],[2.98,104.408778788264],[2.83,121.34375962228201],[2.37,132.05695453258602],[1.77,142.807221598162],[4.32,38.1547961186538],[4.0600000000000005,43.13399602507952],[2.84,50.782862468827865],[3.43,62.988094132392874],[3.91,76.02769264769324],[2.77,84.01846152337545],[2.82,90.4855083378795],[2.9,104.117742713355],[2.96,122.886220101993],[2.22,128.963617605904],[2.3000000000000003,150.620029552771],[3.89,39.682413345062905],[3.9,43.03217676137995],[2.85,52.430110735991136],[3.62,64.18940776678522],[3.92,76.78361803661946],[2.66,80.93500364804457],[2.99,89.68142062771298],[2.98,105.66170672488602],[3,124.68878084147902],[2.56,131.982321661009],[3.43,41.55816235870702],[3.5700000000000003,43.59304774864235],[3.3200000000000003,52.2353910539985],[3.68,66.09306980164483],[3.7800000000000002,74.40629343274678],[2.34,82.89421467109473],[2.98,88.77484171251334],[2.88,109.26407702191901],[3.2800000000000002,117.713740341313],[2.33,131.525973590683],[3.71,42.86746428647277],[3.24,44.85433918060224],[3.54,51.553684193301784],[3.64,68.50462511153866],[4.12,78.95959329230215],[2.09,85.0940863181233],[2.5500000000000003,89.29229183841575],[3.0100000000000002,111.59020214475301],[4.09,115.92113947028301],[2.65,136.090415996039],[4.25,44.61404093242473],[3.17,45.334369093247865],[3.34,52.80341967126374],[4.24,69.4645567297291],[3.48,79.89706237000907],[1.93,84.29888452266223],[3.59,92.21120751969747],[2.82,114.32887641546701],[4.04,110.372703932453],[2.22,139.475122093327]

]

const LineChartOptions = {
  hAxis: {
    title: 'Time',
  },
  vAxis: {
    title: 'Popularity',
  },
  series: {
    1: { curveType: 'function' },
  },
  trendlines: {
    0: {
      type: 'linear',
      color: 'green',
    }
  }
}


class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };

  
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
  

  handleSubmit2 = async e => {
    e.preventDefault();
    const response = await fetch('/stockAvg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  
  
render() {
  
  
    return (
      
      <div className="App">
        
        <Gas></Gas>
        
        <header className="App-header">
         <Component2 data={this.state.data} /> 
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <form onSubmit={this.handleSubmit2}>
   <p>
     <strong>Post to Server:</strong>
   </p>
   <input
     type="text"
     value={this.state.post}
     onChange={e => this.setState({ post: e.target.value })}
   />
   <button type="submit">Submit</button>
 </form>
        <div className="container mt-5">
  <h2>React Google Line Chart Example</h2>
  <Chart
    width={'700px'}
    height={'410px'}
    chartType="ScatterChart"
    loader={<div>Loading Chart</div>}
    data={LineData}
    options={LineChartOptions}
    
    rootProps={{ 'data-testid': '2' }}
  />
</div>
        
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;