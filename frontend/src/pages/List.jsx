import { Trash2Icon } from "lucide-react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/AlertDialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/Select";
import { ListContext } from "../listContext";

export default function List() {
  const { lists, state, handleSetStatus, handleDeleteTodo, handleCreateTodo } =
    useContext(ListContext);
  const { listId } = useParams();

  const [newTodoContent, setNewTodoContent] = useState("");

  if (state !== "ready") {
    return <Loader />;
  }

  const list = lists.find((list) => list.id === listId);

  return (
    <div className="md:w-[600px] w-full px-5 md:px-0">
      <div className="md:flex md:justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {list.name}
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="md:mt-0 mt-2">Add todo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create todo</DialogTitle>
              <DialogDescription>
                You are creating a new todo for the list {list.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Input
                  id="content"
                  placeholder="Buy milk"
                  className="col-span-3"
                  value={newTodoContent}
                  onChange={(event) => setNewTodoContent(event.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={!newTodoContent}
                onClick={() => {
                  handleCreateTodo({
                    listId,
                    content: newTodoContent,
                  });
                  setNewTodoContent("");
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ul className=" mt-6">
        {list.todos.map((todo) => (
          <div className="my-2" key={todo.id}>
            <li className="border px-3 py-2 ">
              <div className="flex justify-between ">
                <div className="flex items-center">
                  <span className="font-bold">{todo.content}</span>
                </div>
                <div className="flex gap-2">
                  <Select
                    value={todo.status}
                    onValueChange={(value) =>
                      handleSetStatus({
                        listId,
                        todoId: todo.id,
                        status: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TO_DO">To do</SelectItem>
                      <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                      <SelectItem value="DONE">Done</SelectItem>
                    </SelectContent>
                  </Select>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your todo.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <span
                          onClick={() =>
                            handleDeleteTodo({
                              listId,
                              todoId: todo.id,
                            })
                          }
                        >
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </span>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
