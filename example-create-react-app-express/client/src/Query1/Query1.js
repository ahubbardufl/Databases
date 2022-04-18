import React, {useState, useEffect} from "react"
import LineChart from "./LineChart"

function Query1(){

    const[usState, setUsState] = useState("USA");

    const[stateData, setStateData] = useState([]);

    const[line, setLine] = useState({
        labels: ["2014", "2015", "2016", "2017", "2018"],
        datasets: [
          {
            label: "States",
            data: [],
            borderColor: "rgba(75,192,192,1)"
          }
        ],
    });


/*
    useEffect(() => {
        let stolenPoints = []
        let notStolenPoints = []
        stateData.forEach( i => {
            let stolenData = parseFloat(i.stolen)*100;
            let notStolenData = parseFloat(i.notstolen)*100;
            console.log(i.state);
            console.log(stolenData)
            stolenPoints.push(stolenData);
            notStolenPoints.push(notStolenData);
          });

        console.log(stolenPoints);
        setLine({
            labels: ["2013", "2014", "2015", "2016", "2017", "2018"],
            datasets: [
              {
                label: "Stolen",
                data: stolenPoints,
                borderColor: "rgb(95, 158, 160)"
              },
              {
                label: "Not Stolen",
                data: notStolenPoints,
                borderColor: "rgba(75,192,192,1)"  
              }
            ],
        })
    }, [stateData])
    */

    useEffect(() => {
        const fetchData = async () => {
            try{
              
              fetch(`/api/world`)
                .then(res => res.json())
                .then(json => {
                  setStateData(json);
                  console.log(json);
              })
    
            } catch(error) {
              console.log("error: ", error);
            }
          }
          fetchData();

    }, [usState])

    const handleState = (event) =>{
        setUsState(event.target.value);
    }

    return(
        
        <div className="main-container">
            <div className="chart-container-6">
                <h1>{usState} Stolen Gun Statistics (Percentages)</h1>
                <LineChart chartData={line} />
                <select onChange={handleState} defaultValue = "USA">
                    <option value="USA">United States</option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="D.C.">D.C.</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="New York">New York</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                </select>
            </div>
        </div>
        
    )

};

export default Query1;