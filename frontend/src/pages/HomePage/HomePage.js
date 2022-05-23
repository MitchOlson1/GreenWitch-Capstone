import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import LikeDislike from "../../components/LikeDislike/LikeDislike";
import "./HomePage.css"

const HomePage = (props) => {
  document.body.style.backgroundColor = "darkgreen";
  const { user, chef } = useContext(AuthContext);

  const [userChefs, setUserChefs] = useState([]);
  const [image, SetImage] = useState([]);
  const [chefClicked, setChefClicked] = useState(false);
  const [selectedChef, setSelectedChef] = useState([]);
  const [foundChef, setFoundChef] = useState([]);
  const [meals, setMeals] = useState([]);



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
      setMeals(foundChef.meal[0]);
      console.log(meals)
      console.log("foundChef", foundChef)
      foundChef.map(chef => 
        console.log(chef)
      )
    }

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
  return (
    <div className="container">
     <h2>Home Page for {user.name}!</h2>
        {userChefs && 
          userChefs.map((chef, i) => (
            <li className="btn1" key={i}>
              <button className="btn btn-outline-success" onClick={displayChef}>                
                {chef.chef}        
              </button>
            </li>        
          ))}
          {chefClicked === true &&
            meals.map((obj) => (
             console.log(obj)
            ))
          }  
    </div>
  );
};


export default HomePage;

