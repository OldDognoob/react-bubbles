import React, { useState } from "react";
import axios from "../auth";
import AddColor from "./AddColor";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axios()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id},colorToEdit`)
      .then(response => {
        updateColors(
          colors.map(color =>
            color.id === response.data.id ? response.data : color
          )
        );
      })
      .catch(error => {
        console.log(error);
      });
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axios()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(response => {
        updateColors(colors.filter(color => color.id !== response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="colors-wrap">
      <div>
        <div className="formDiv">
          <h3>Add a Color</h3>
          <p>colors</p>
          <ul>
            {colors.map(color => (
              <li key={color.color} onClick={() => editColor(color)}>
                <span>
                  <span
                    className="delete"
                    onClick={e => {
                      e.stopPropagation();
                      deleteColor(color);
                    }}
                  >
                    x
                  </span>{" "}
                  {color.color}
                </span>
                <div
                  className="color-box"
                  style={{ backgroundColor: color.code.hex }}
                />
              </li>
            ))}
          </ul>
          {editing && (
            <form onSubmit={saveEdit}>
              <legend>edit color</legend>
              <label>
                color name:
                <input
                  onChange={e =>
                    setColorToEdit({ ...colorToEdit, color: e.target.value })
                  }
                  value={colorToEdit.color}
                />
              </label>
              <label>
                hex code:
                <input
                  onChange={e =>
                    setColorToEdit({
                      ...colorToEdit,
                      code: { hex: e.target.value }
                    })
                  }
                  value={colorToEdit.code.hex}
                />
              </label>
              <div className="button-row">
                <button type="submit">save</button>
                <button onClick={() => setEditing(false)}>cancel</button>
              </div>
            </form>
          )}
          <AddColor updateColors={updateColors} />
          <div className="spacer" />
          {/* stretch - build another form here to add a color */}
        </div>
      </div>
    </div>
  );
};

export default ColorList;
