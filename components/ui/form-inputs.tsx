"use client";

import * as React from "react";
import {
  TextInput as BaseTextInput,
  TextArea as BaseTextArea,
  Select,
  Radio,
} from "@page-speed/forms/inputs";

type TextInputProps = Omit<React.ComponentProps<typeof BaseTextInput>, "type"> &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "name" | "defaultValue" | "type"
  > & {
    type?: React.HTMLInputTypeAttribute;
  };

type TextAreaProps = React.ComponentProps<typeof BaseTextArea> &
  Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "value" | "name" | "defaultValue"
  >;

const TextInput = BaseTextInput as React.ComponentType<TextInputProps>;
const TextArea = BaseTextArea as React.ComponentType<TextAreaProps>;

export { TextInput, TextArea, Select, Radio };
