'use client'

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ConfirmationDialog({ isOpen,onClose }) {
//   const [open, setOpen] = useState(isOpen)

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose(); // Trigger the callback when the dialog is closed
        }
      }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='text-center'>Order Confirmation</DialogTitle>
          <DialogDescription>
            Thank you for placing your order! Your order is currently pending. You will receive a confirmation email once your order has been reviewed and approved.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
