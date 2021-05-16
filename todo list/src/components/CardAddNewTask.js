import React, { useState } from "react";

function setClasses(theme) {
  let lightThemeClasses = ["card-add-new-task ", "add-new-task-input "];
  let classes = lightThemeClasses;
  if (theme === "dark") {
    const darkThemeClasses = lightThemeClasses.map(
      (prev) => prev + "dark-theme-" + prev
    );
    classes = darkThemeClasses;
  }
  return classes;
}

function CardAddNewTask(props) {
  const [newTask, setNewTask] = useState("");

  const classes = setClasses(props.theme);

  function handleAddTask() {
    props.addTaskCallback(newTask);
    setNewTask("");
  }
  //  how to center inline elements: https://stackoverflow.com/a/25788111/12600647
  return (
    <div className={classes[0]}>
      <div
        className="checkbox-circular-unchecked"
        onClick={handleAddTask}
      ></div>
      <input
        className={classes[1]}
        type="text"
        placeholder="Create a new todo..."
        onChange={(event) => setNewTask(event.target.value)}
        value={newTask}
      />
    </div>
  );
}

export default CardAddNewTask;
