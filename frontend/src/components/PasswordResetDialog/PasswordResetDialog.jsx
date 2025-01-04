'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PasswordResetDialog({ isOpen,onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Password Reset Email Sent</DialogTitle>
          <DialogDescription>
            We have sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.
            <br />
            If you do not see the email, be sure to check your spam folder. For further assistance, feel free to contact our support team.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
