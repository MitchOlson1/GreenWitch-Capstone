import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import LikeDislike from "../../components/LikeDislike/LikeDislike";

const HomePage = (props) => {
  const { user } = useContext(AuthContext);
  const [allChefPosts, setallChefPosts] = useState([]);
  const [Chefs, setChefs] = useState([]);
  const [userChefs, setUserChefs] = useState([]);

  async function getChefs() {
    // console.log(user._id);
    let response = await axios.get(
      `http://localhost:3012/api/users/${user._id}`
    );
    console.log(response.data);
    setUserChefs(response.data.chefs);
  }
  async function getChefDishes() {
    setChefs([]);
    for (let i = 0; i < userChefs.length; i++) {
      await axios
        .get(`http://localhost:3012/api/users/${userChefs[i]}/chefs`)
        .then((response) => {
          //console.log(response.data)
          setChefs((chef) => [...chef, response.data]);
        });
    }
  }

  const flatArray = Chefs.flatMap((item) => item);
  //console.log("flat", flatArray)

  const convertDate = flatArray
    .map(
      (item) => ({ ...item, sortDate: new Date(item.dateAdded) })
      // console.log( new Date(item.dateAdded));
      // item.dateAdded = Date.parse(item.dateAdded)
    )
    .sort((date1, date2) => date2.sortDate - date1.sortDate);
  //console.log(convertDate)

  useEffect(() => {
    getChefs();
  }, []);

  useEffect(() => {
    getChefDishes();
    //console.log(Chefs);
  }, [userChefs]);

  return (
    <div className="container">
     <h2>Home Page for {user.name}!</h2>
    <table className="table">
      <thead>
        <tr>
          <td>Chef</td>
          <td>Dishes</td>
          <td>{" "}</td>
        </tr>
      </thead>
      <tbody>
        {convertDate &&
          convertDate.map((f, i) => {
            return (
              <tr key={i}>
                <td>{f.chef}</td>
                <td>{f.dishes}</td>
                <td>
                  <LikeDislike f={f} getChefDishes={getChefDishes} />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
    </div>
  );
};


export default HomePage;

