import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";

const NumberInput = <T extends FieldValues>({
  field,
}: {
  field: ControllerRenderProps<T, Path<T>>;
}) => <Input {...field} className="book-form_input" type="number" min={0} />;

export default NumberInput;
