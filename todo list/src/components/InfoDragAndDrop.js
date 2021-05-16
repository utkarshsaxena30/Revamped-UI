import React from "react";

function InfoDragAndDrop(props) {
  return (
    <div
      className={
        props.theme === "dark"
          ? "info-drag-and-drop dark-theme-info-drag-and-drop"
          : "info-drag-and-drop"
      }
    >
      Drag and drop to reorder list
    </div>
  );
}

export default InfoDragAndDrop;
