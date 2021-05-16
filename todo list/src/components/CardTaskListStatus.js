import React from "react";
import CardTaskListFilter from "./CardTaskListFilter";

function setClasses(theme, layout) {
  let lightThemeClasses = [layout, "task-list-status "];
  let classes = lightThemeClasses;
  if (theme === "dark") {
    const darkThemeClasses = lightThemeClasses.map(
      (prev) => prev + "dark-theme-" + prev
    );
    classes = darkThemeClasses;
  }
  return classes;
}

function CardTaskListStatus(props) {
  let incompleteTasks = props.tasks.filter((task) => {
    if (task.status) return false;
    else return true;
  });

  const activeTasks = incompleteTasks.length;
  const completedTasks = props.tasks.length - activeTasks;

  let tasks;
  props.filter === "Completed"
    ? (tasks = completedTasks)
    : (tasks = activeTasks);

  let layout = "card-task-list-status ";
  if (activeTasks > 0) layout += "has-tasks ";
  else layout += "no-tasks ";

  const classes = setClasses(props.theme, layout);

  return (
    <div className={classes[0]}>
      {tasks === 1 && <span className={classes[1]}>1 item left</span>}
      {tasks !== 1 && <span className={classes[1]}>{tasks} items left</span>}
      {props.screenWidth >= "900" && (
        <CardTaskListFilter
          theme={props.theme}
          callbackToggleFilter={props.callbackToggleFilter}
        />
      )}
      <span
        className={classes[1]}
        onClick={() => props.clearCompletedTasksCallback()}
      >
        Clear Completed
      </span>
    </div>
  );
}

export default CardTaskListStatus;
