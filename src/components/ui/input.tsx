'use client'

import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefixNode?: React.ReactNode
  containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefixNode, containerClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    return (
      <div className={cn('relative w-full', containerClassName)}>
        {prefixNode}
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
          {type === 'password' ? (
            showPassword ? (
              <EyeClosedIcon onClick={togglePasswordVisibility} />
            ) : (
              <EyeOpenIcon onClick={togglePasswordVisibility} />
            )
          ) : null}
        </div>
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
