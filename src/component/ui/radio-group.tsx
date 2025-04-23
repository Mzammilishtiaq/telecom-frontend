import * as React from "react"
import Radio from "@mui/material/Radio"
import RadioGroupMUI from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import { styled } from "@mui/material/styles"
import { cn } from "../../lib/utlits"

const StyledRadio = styled(Radio)(({ theme }:any) => ({
  padding: 4,
  '&.Mui-disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}))

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadioGroupMUI>
>(({ className, ...props }, ref) => {
  return (
    <FormControl ref={ref}>
      <RadioGroupMUI
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormControl>
  )
})
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Radio>, 'css'> {
  id?: string
  label?: React.ReactNode // Explicit label prop instead of using children
}

const RadioGroupItem = React.forwardRef<any, RadioGroupItemProps>(
  ({ className, id, label, ...props }, ref) => {
    if (!label) {
      return (
        <StyledRadio
          id={id}
          ref={ref}
          className={cn(
            "aspect-square h-4 w-4 rounded-full border border-primary text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      )
    }

    return (
      <FormControlLabel
        control={
          <StyledRadio
            id={id}
            ref={ref}
            className={cn(
              "aspect-square h-4 w-4 rounded-full border border-primary text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
        }
        label={label}
      />
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
