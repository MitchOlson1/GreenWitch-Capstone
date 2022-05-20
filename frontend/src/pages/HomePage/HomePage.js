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
  const [image, SetImage] = useState([]);

  async function getChefs() {
    // console.log(user._id);
    let response = await axios.get(
      `http://localhost:3012/api/users/chefs`
    );
    // console.log(response.data);
    setUserChefs(response.data);
  }
  // async function getChefDishes() {
  //   setChefs([]);
  //   for (let i = 0; i < userChefs.length; i++) {
  //     await axios
  //       .get(`http://localhost:3012/api/users/${userChefs[i]}/chefs`)
  //       .then((response) => {
  //         //console.log(response.data)
  //         setChefs((chef) => [...chef, response.data]);
  //       });
  //   }
  // }

  
  useEffect(() => {
    getChefs();
  }, []);

  // useEffect(() => {
  //   getChefDishes();
  //   // console.log(Chefs);
  // }, [userChefs]);

  return (
    <div className="container">
     <h2>Home Page for {user.name}!</h2>
    <table className="table">
      <thead>
        <tr>
          <td>Chef</td>
          <td></td>
          <td>Dishes</td>
          <td>{" "}</td>
        </tr>
      </thead>
      <tbody>
        {userChefs &&
          userChefs.map((f, i) => {
            return (
              <tr key={i}>
                <td>{f.chef}</td>
                <td>{f.post}</td>
                <td>{f.dishes}</td>
                <td>
                  {/* <LikeDislike f={f} getChefDishes={getChefDishes} /> */}
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

