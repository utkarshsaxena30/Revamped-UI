import React, { useState } from "react";

function setClasses(theme) {
  let lightThemeClasses = [
    "card-task-list-filter ",
    "task-list-filter-option ",
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

function CardTaskListFilter(props) {
  const [filter, setFilter] = useState("All");

  const classes = setClasses(props.theme);

  function handleFilterChange(event) {
    const currentFilter = event.target.innerHTML;
    setFilter(currentFilter);
    props.callbackToggleFilter(currentFilter);
  }

  return (
    <div className={classes[0] + classes[1]}>
      <div
        className={filter === "All" ? "task-list-filter-current" : undefined}
        onClick={handleFilterChange}
      >
        All
      </div>
      <div
        className={filter === "Active" ? "task-list-filter-current" : undefined}
        onClick={handleFilterChange}
      >
        Active
      </div>
      <div
        className={
          filter === "Completed" ? "task-list-filter-current" : undefined
        }
        onClick={handleFilterChange}
      >
        Completed
      </div>
    </div>
  );
}

export default CardTaskListFilter;
