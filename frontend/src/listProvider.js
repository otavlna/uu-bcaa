import { useEffect, useState } from "react";
import { ListContext } from "./listContext.js";

function ListProvider({ children }) {
  const [listLoadObject, setListLoadObject] = useState({
    state: "pending",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/list/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setListLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setListLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/list/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });

    if (response.status < 400) {
      await refetch();
    } else {
      setListLoadObject((current) => {
        return { state: "error", data: [], error: "" };
      });
    }
  }

  async function handleSetStatus(dtoIn) {
    setListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/todo/setStatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });

    if (response.status < 400) {
      await refetch();
    } else {
      setListLoadObject((current) => {
        return { state: "error", data: [], error: "" };
      });
    }
  }

  async function handleCreateTodo(dtoIn) {
    setListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/todo/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      await refetch();
    } else {
      setListLoadObject((current) => {
        return { state: "error", data: [], error: "" };
      });
    }
  }

  async function handleDeleteTodo(dtoIn) {
    setListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/todo/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });

    if (response.status < 400) {
      await refetch();
    } else {
      setListLoadObject((current) => {
        return { state: "error", data: [], error: "" };
      });
    }
  }

  async function refetch() {
    await handleLoad();
  }

  const value = {
    state: listLoadObject.state,
    lists: listLoadObject.data || [],
    handleCreate,
    handleSetStatus,
    handleCreateTodo,
    handleDeleteTodo,
    refetch,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
}

export default ListProvider;
