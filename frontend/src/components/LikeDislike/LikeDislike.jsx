import React from "react";
import axios from "axios"

const LikeDislikes = (props) => {

  async function handleLikes(event) {
    event.preventDefault();
    await axios.put(
      `http://localhost:3012/api/users/${props.f.uID}/post/${props.f._id}/likes`);
    props.getChefDishes();
  }

  async function handleDislikes(event) {
    event.preventDefault();
    await axios.put(
      `http://localhost:3012/api/users/${props.f.uID}/post/${props.f._id}/dislikes`);
    props.getChefDishes();
  }

  return (
    <div>
      <div >
        <div>
          <div>
            <button type="button" className="bg-success m-3 text-white" onClick={(event) => handleLikes(event)}>
              Like {props.f.likes}
            </button>
            <button type="button" className="bg-success m-3 text-white" onClick={(event) => handleDislikes(event)}>
              Dislike {props.f.dislikes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LikeDislikes;