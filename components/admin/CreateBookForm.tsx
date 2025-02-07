"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ControllerRenderProps,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import ColorPicker from "@/components/admin/ColorPicker";
import NumberInput from "@/components/admin/NumberInput";

type InputTypes = "text" | "number" | "color" | "file" | "textarea";

export interface FieldDescription {
  label?: string;
  placeholder?: string;
  type?: InputTypes;
}

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  fieldDescriptions: Record<keyof T, FieldDescription>;
}

const CreateBookForm = <T extends FieldValues>({
  schema,
  defaultValues,
  fieldDescriptions,
}: Props<T>) => {
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    console.log("handleSubmit", data);
  };

  const renderInput = (
    type: InputTypes,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    switch (type) {
      case "number":
        return <NumberInput field={field} />;
      case "color":
        return <ColorPicker value={field.value} onPickerChange={() => {}} />;
      case "textarea":
        return <Textarea rows={5} className="book-form_input" {...field} />;
      default:
        return <Input type={type} className="book-form_input" {...field} />;
    }
  };

  const isFieldRequired = (name: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return !(schema.shape[name] instanceof z.ZodOptional);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="my-6 max-w-5xl"
      >
        {Object.keys(defaultValues).map((key) => (
          <FormField
            key={key as Path<T>}
            control={form.control}
            name={key as Path<T>}
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel>
                  {fieldDescriptions[field.name]?.label ||
                    field.name ||
                    "Label"}
                  {isFieldRequired(field.name) && (
                    <span className="ml-1 text-red">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  {renderInput(
                    fieldDescriptions[field.name]?.type as InputTypes,
                    field,
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button className="book-form_btn text-white">Create Book</Button>
      </form>
    </Form>
  );
};

export default CreateBookForm;
