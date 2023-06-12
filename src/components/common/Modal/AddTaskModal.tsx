import * as Dialog from "@radix-ui/react-dialog";
import styles from "@/styles/AddModal.module.scss";

import { statusesSelector, useBoardStore } from "@/zustand/board";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import IconCross from "/public/icon-cross.svg";
import { cn } from "@/lib/utils";
import { type TaskType } from "@/utils/types";
import { useModalStore } from "@/zustand/modal";

const formSchema = z.object({
  title: z.string().min(1, { message: "Cant be blank" }),
  description: z.string().min(1, { message: "Cant be blank" }),
  subtasks: z
    .array(
      z.object({
        value: z.string().min(1, { message: "Cant be blank" }),
      })
    )
    .min(1, { message: "Need at least 1 subtask" }),
  status: z.string().min(1, { message: "Cant be blank" }),
});

const AddTaskModal = () => {
  const { setModalType } = useModalStore();
  const { addTask } = useBoardStore();
  const currentBoardStatuses = useBoardStore(statusesSelector);
  const firstBoardStatus = currentBoardStatuses[0];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      subtasks: [{ value: "" }],
      status: currentBoardStatuses[0],
    },
  });

  const subtasksFieldArry = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const targetedColumnIndex = currentBoardStatuses.findIndex(
      (status) => status === values.status
    );
    const newTask: TaskType = {
      title: values.title,
      description: values.description,
      subtasks: values.subtasks.map((subtask) => ({
        title: subtask.value,
        isCompleted: false,
      })),
      status: values.status,
    };

    addTask(newTask, targetedColumnIndex);
    setModalType(null);
  }

  const renderSubTasks = () => {
    return (
      <>
        <div className={styles.subtasksContainer}>
          {subtasksFieldArry.fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`subtasks.${index}.value`}
              render={({ field }) => (
                <FormItem className="[&:not(:last-child)]:mb-3">
                  {index === 0 && (
                    <FormLabel className={styles.formLabel}>Subtasks</FormLabel>
                  )}
                  <FormControl>
                    <div className={styles.subtask}>
                      <Input {...field} />
                      {subtasksFieldArry.fields.length > 1 ? (
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          onClick={() => subtasksFieldArry.remove(index)}
                        >
                          <IconCross />
                        </Button>
                      ) : null}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            onClick={() => subtasksFieldArry.append({ value: "" })}
            className={styles.addSubtaskButton}
          >
            Add new subtask
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <Dialog.Title className={styles.dialogTitle}>Add New Task</Dialog.Title>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(styles.addTask, "space-y-6")}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={styles.formLabel}>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Take coffee break" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={styles.formLabel}>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {renderSubTasks()}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={styles.formLabel}>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={firstBoardStatus}>
                        {firstBoardStatus}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {currentBoardStatuses.map((boardStatus) => (
                      <SelectItem key={boardStatus} value={boardStatus}>
                        {boardStatus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className={styles.addTaskSubmitButton}>
            Create Task
          </Button>
        </form>
      </Form>
    </>
  );
};
export default AddTaskModal;
