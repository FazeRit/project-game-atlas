import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        lightgray:
          "bg-[#737373] hover:bg-[#8c8c8c] text-white shadow",
      },
      size: {
        default: "h-8 px-3 text-xs md:h-10 md:px-4 md:text-sm", 
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 md:text-base",
      },
    },
    defaultVariants: {
      variant: "lightgray",
      size: "default",
    },
  }
)