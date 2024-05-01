import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/Dialog";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Loader } from "../components/Loader";
import { ListContext } from "../listContext";

export default function Root() {
  const { lists, refetch, handleCreate, state } = useContext(ListContext);
  const location = useLocation();

  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    refetch();
  }, [location]);

  if (state !== "ready") {
    return <Loader />;
  }

  return (
    <div className="md:w-[600px] w-full px-5 md:px-0">
      <div className="md:flex md:justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Your todo lists
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="md:mt-0 mt-2">Add new list</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create todo list</DialogTitle>
              <DialogDescription>
                Fill in the name of the new list and click save
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Shopping list"
                  className="col-span-3"
                  value={newListName}
                  onChange={(event) => setNewListName(event.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={!newListName}
                onClick={() => {
                  handleCreate({
                    name: newListName,
                  });
                  setNewListName("");
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <p className="leading-7 [&:not(:first-child)]:mt-6 mb-3">
        Good morning, User
      </p>

      <ul className="md:w-[50%] w-full">
        {lists.map((list) => (
          <Link to={`/list/${list.id}`} key={list.id}>
            <div className="my-2">
              <li className="border px-3 py-2 font-bold">{list.name}</li>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
