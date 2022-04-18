
import React from 'react';
  
const Component2 = (props) => {

    return (
        <div className="main-cointainer">
            <h2>{console.log(props)}</h2> 
              
<p>{props.responseToPost} </p>
  
        </div>
    )
}
  
export default Component2;