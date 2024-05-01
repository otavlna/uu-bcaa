import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import List from "./pages/List";
import Root from "./pages/Root";
import ListProvider from "./listProvider";

function App() {
  return (
    <Layout>
      <ListProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Root />}></Route>
            <Route path="list/:listId" element={<List />}></Route>
          </Routes>
        </BrowserRouter>
      </ListProvider>
    </Layout>
  );
}

export default App;
