import React, { useCallback, useEffect, useState } from "react";

import items from "./defaultItems";

import CardLogo from "./components/CardLogo";
import CardAddNewTask from "./components/CardAddNewTask";
import CardTaskListItem from "./components/CardTaskListItem";
import CardTaskListStatus from "./components/CardTaskListStatus";
import CardTaskListFilter from "./components/CardTaskListFilter";
import InfoDragAndDrop from "./components/InfoDragAndDrop";

import { v1 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [tasks, setTasks] = useState(items);
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState("light");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  function handleResize() {
    setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const active = tasks.filter((task) => {
      if (task.status) return false;
      return true;
    });
    const completed = tasks.filter((task) => {
      if (task.status) return true;
      return false;
    });
    setActiveTasks(active);
    setCompletedTasks(completed);
  }, [tasks, filter]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      if (prev === "light") document.body.classList.add("dark-theme-body");
      else document.body.classList.remove("dark-theme-body");
      return prev === "light" ? "dark" : "light";
    });
  }, []);

  const addTask = useCallback((newTask) => {
    setTasks((prev) => {
      const task = {
        id: uuid(),
        task: newTask,
        status: false,
      };
      return [...prev, task];
    });
  }, []);

  const taskStatusToggle = useCallback((id) => {
    setTasks((prev) => {
      const newTasks = prev.map((task) => {
        if (task.id === id) return { ...task, status: !task.status };
        return task;
      });
      return [...newTasks];
    });
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => {
      const newTasks = prev.filter((task) => {
        if (task.id === id) return false;
        return true;
      });
      return [...newTasks];
    });
  }, []);

  const clearCompletedTasks = useCallback(() => {
    setTasks((prev) => {
      const incompleteTasks = prev.filter((task) => {
        if (task.status) return false;
        return true;
      });
      return [...incompleteTasks];
    });
  }, []);

  const toggleFilter = useCallback((_filter) => {
    setFilter(_filter);
  }, []);

  const handleOnDragEnd = useCallback(
    (result) => {
      console.log("end");
      if (!result.destination) return;

      const reorderedTasks = tasks;
      const [reorderedItem] = reorderedTasks.splice(result.source.index, 1);
      reorderedTasks.splice(result.destination.index, 0, reorderedItem);

      setTasks(reorderedTasks);
    },
    [tasks]
  );

  function CreateTaskListItem(task, index) {
    return (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <CardTaskListItem
            id={task.id}
            item={task.task}
            status={task.status}
            callbackTaskStatusToggle={taskStatusToggle}
            callbackDeleteTask={deleteTask}
            addProps={provided}
            theme={theme}
          />
        )}
      </Draggable>
    );
  }

  return (
    <div>
      <CardLogo theme={theme} callbackToggleTheme={toggleTheme} />
      <CardAddNewTask theme={theme} addTaskCallback={addTask} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="container-task-list">
          {(provided) => (
            <div
              className="container-task-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filter === "All" && tasks.map(CreateTaskListItem)}
              {filter === "Active" && activeTasks.map(CreateTaskListItem)}
              {filter === "Completed" && completedTasks.map(CreateTaskListItem)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <CardTaskListStatus
        screenWidth={screenWidth}
        tasks={tasks}
        filter={filter}
        clearCompletedTasksCallback={clearCompletedTasks}
        theme={theme}
        callbackToggleFilter={toggleFilter}
      />
      {screenWidth <= 900 && (
        <CardTaskListFilter theme={theme} callbackToggleFilter={toggleFilter} />
      )}
      <InfoDragAndDrop theme={theme} />
    </div>
  );
}

export default App;
