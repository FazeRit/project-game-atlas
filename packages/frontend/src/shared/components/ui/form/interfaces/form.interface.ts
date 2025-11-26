import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form"

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

export type FormItemContextValue = {
  id: string
}

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface FormLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {}

export interface FormControlProps
  extends React.ComponentPropsWithoutRef<typeof Slot> {}

export interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = ControllerProps<TFieldValues, TName>