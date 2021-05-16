import React from "react";

function setClasses(theme) {
  let lightThemeClasses = [
    "card-task-list-item ",
    "task-list-item ",
    "task-list-item-strikethrough ",
  ];
  let classes = lightThemeClasses;
  if (theme === "dark") {
    const darkThemeClasses = lightThemeClasses.map(
      (prev) => prev + "dark-theme-" + prev
    );
    classes = darkThemeClasses;
  }
  return classes;
}

function CardTaskListItem(props) {
  const incomplete = {
    checkbox: "checkbox-circular-unchecked ",
    iconCheck: false,
    taskListItem: "task-list-item ",
  };

  const complete = {
    checkbox: "checkbox-circular-gradient ",
    iconCheck: true,
    taskListItem: "task-list-item-strikethrough ",
  };

  let current;
  if (!props.status) current = incomplete;
  else current = complete;

  const classes = setClasses(props.theme);

  function handleTaskStatusToggle() {
    console.log("pressed");
    props.callbackTaskStatusToggle(props.id);
  }

  function handleDeleteTask() {
    props.callbackDeleteTask(props.id);
  }
  return (
    <div
      className={classes[0]}
      ref={props.addProps.innerRef}
      {...props.addProps.draggableProps}
      {...props.addProps.dragHandleProps}
    >
      <div className={current.checkbox} onClick={handleTaskStatusToggle}>
        {current.iconCheck && (
          <img
            className="icon-check"
            src="/images/icon-check.svg"
            alt="icon-check"
          ></img>
        )}
      </div>
      <div className={!props.status ? classes[1] : classes[2]}>
        {props.item}
      </div>
      <img
        className="icon-cross"
        src="/images/icon-cross.svg"
        alt="icon-cross"
        onClick={handleDeleteTask}
      ></img>
    </div>
  );
}

export default CardTaskListItem;
