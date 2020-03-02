import React, { useState } from "react";
import axios from "../auth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

export default function AddColor({ updateColors }) {
  const [newColor, setNewColor] = useState(initialColor);

  function editNewColor(event) {
    setNewColor({
      ...newColor,
      [event.target.name]:
        event.target.name === "code"
          ? { hex: event.target.value }
          : event.target.value
    });
  }

  function addNewColor(event) {
    event.preventDefault();
    axios()
      .post(`http://localhost:5000/api/colors`, newColor)
      .then(response => {
        updateColors(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <form onSubmit={addNewColor} className="add-color">
      <label htmlFor="color">
        Color
        <input onChange={editNewColor} name="color" type="text" />
      </label>
      <label htmlFor="code">
        Code
        <input onChange={editNewColor} name="code" type="text" />
      </label>
      <div className="button-row">
        <button type="submit">Add color</button>
      </div>
    </form>
  );
}
