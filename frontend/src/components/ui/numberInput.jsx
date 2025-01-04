"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function numberInput() {
  const [value, setValue] = useState(50)
  const min = 0
  const handleIncrement = () => {
    setValue(Math.min(value + 1, max))
  }
  const handleDecrement = () => {
    setValue(Math.max(value - 1, min))
  }
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="number">Number</Label>
      <div className="flex items-center gap-2">
        <Input
          id="number"
          type="number"
          value={value}
          onChange={(e) => setValue(Math.min(Math.max(parseInt(e.target.value, 10), min)))}
          min={min}
          className="w-full text-center"
        />
        <div className="flex flex-col">
          <Button variant="ghost" size="icon" onClick={handleIncrement}>
            <ChevronUpIcon className="h-4 w-4" />
            <span className="sr-only">Increment</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDecrement}>
            <ChevronDownIcon className="h-4 w-4" />
            <span className="sr-only">Decrement</span>
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Enter a number between {min} and {max}.
      </p>
    </div>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function ChevronUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}