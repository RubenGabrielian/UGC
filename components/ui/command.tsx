"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import * as CommandPrimitive from "cmdk"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Command>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Command>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Command
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.Command.displayName

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandInput>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandInput>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" data-slot="command-input-wrapper">
    <CommandPrimitive.CommandInput
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.CommandInput.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandList>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandList>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandList
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.CommandList.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandEmpty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandEmpty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandEmpty
    ref={ref}
    className={cn("py-6 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.CommandEmpty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandGroup>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandGroup>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandGroup
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.CommandGroup.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandSeparator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandSeparator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandSeparator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.CommandSeparator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandItem>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandItem>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.CommandItem.displayName

const CommandShortcut = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

type CommandDialogProps = DialogProps

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-input]]:h-12 [&_[cmdk-input]]:text-base">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
