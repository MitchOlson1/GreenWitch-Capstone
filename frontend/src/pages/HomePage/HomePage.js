import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import LikeDislike from "../../components/LikeDislike/LikeDislike";

const HomePage = (props) => {
  const { user, chef } = useContext(AuthContext);

  const [userChefs, setUserChefs] = useState([]);
  const [image, SetImage] = useState([]);
  const [chefClicked, setChefClicked] = useState(false);
  const [selectedChef, setSelectedChef] = useState([]);
  const [foundChef, setFoundChef] = useState([])


  async function getChefs() {
    // console.log(user._id);
    let response = await axios.get(
      `http://localhost:3012/api/users/chefs`
    );
    console.log(response.data);
    userChefs.map((chef) => (
      console.log(chef._id)
    )); 
    setUserChefs(response.data);
  }


    function displayChef(e) {
      e.preventDefault();
      console.log(e.target.innerText)
      setChefClicked(true)
      // setSelectedChef(i)
      let name = e.target.innerText;
      let foundChef = userChefs.find(e => e.chef === name)
      setFoundChef(foundChef)
      // console.log("foundChef", foundChef)
    }

  
  // async function handleClickInfo (event) {
  //   event.preventDefault();
  //   setChefs([]);
  //     await axios
  //       .get(`http://localhost:3012/api/users/${userChefs[chef._id]}`)
  //       .then((response) => 
  //         //console.log(response.data)
  //         setChefs((chef) => [...chef, response.data])
  //       );
  //       console.log(chef)
    
  // }

  
  useEffect(() => {
    getChefs();
    console.log()
  }, []);

  // useEffect(() => {
  //   displayChef();
  //   // console.log(Chefs);
  // }, []);

  // if (chefClicked === true){
  //   console.log(userChefs)
  //   return(
  //   <div className="container">
  //     {userChefs.map((chef, i) => (
  //       <li key={i}>
  //         {chef.meal}
  //       </li>
  //     ))}
  //   </div>
  //   )
  // }
  if (chefClicked === true){
    return(
      <div className="container">
        <h1>{foundChef.dishes}</h1>
        <h2></h2>
      </div>
    )
  }
  else{

  
  return (
    <div className="container">
     <h2>Home Page for {user.name}!</h2>
        {userChefs && 
          userChefs.map((chef, i) => (
            <li key={i}>
              <button onClick={displayChef}>                
                {chef.chef}        
              </button>
            </li>        
          ))}

            {/* {(chefClicked === true) && 
                userChefs.map((chef, i) => (
                <li key={i}>
                  {chef.meal}
                </li>
              ))
            } */}
          
         
    </div>
  );
  }
};


export default HomePage;

