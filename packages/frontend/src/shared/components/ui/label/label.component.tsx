import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "../../../utils"
import { labelVariants } from "./const"
import { LabelProps } from "./interfaces"

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    data-slot="label"
    className={cn(labelVariants(), className)}
    {...props}
  />
))

Label.displayName = LabelPrimitive.Root.displayName

export { Label, labelVariants }