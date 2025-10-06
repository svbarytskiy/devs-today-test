import {
  useState,
  forwardRef,
  type InputHTMLAttributes,
  type ChangeEvent,
} from 'react'
import { Eye, EyeOff, X } from 'lucide-react'
import clsx from 'clsx'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'password' | 'number' | 'email' | 'search'
  clearable?: boolean
  variant?: 'default' | 'inverted'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      type = 'text',
      clearable = false,
      variant = 'default',
      size = 'md',
      disabled = false,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPasswordType = type === 'password'
    const actualInputType = isPasswordType && showPassword ? 'text' : type

    const handleClear = () => {
      if (disabled) return
      const syntheticEvent = {
        target: { value: '' },
      } as ChangeEvent<HTMLInputElement>
      onChange(syntheticEvent)
    }

    const togglePasswordVisibility = () => {
      if (disabled) return
      setShowPassword(prev => !prev)
    }

    const baseClasses =
      'w-full rounded-lg transition-all border outline-none focus:ring-2'

    const variantClasses =
      variant === 'inverted'
        ? 'bg-gray-800 text-white border-gray-700 focus:border-indigo-400 focus:ring-indigo-500/50'
        : 'bg-white text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/50'

    const sizeClasses = {
      sm: 'h-8 text-sm px-3',
      md: 'h-10 text-base px-4',
      lg: 'h-12 text-lg px-5',
    }[size]

    const inputClasses = clsx(
      baseClasses,
      variantClasses,
      sizeClasses,
      className,
      {
        'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-75':
          disabled,
        'pr-10': isPasswordType || (clearable && value),
      },
    )

    return (
      <div className={`relative flex items-center ${className}`}>
        <input
          ref={ref}
          type={actualInputType}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={inputClasses}
          {...rest}
        />

        <div className="absolute right-0 flex items-center h-full pr-3 space-x-2">
          {isPasswordType && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={disabled}
              className={clsx(
                'text-gray-500 hover:text-indigo-600 transition-colors p-1',
                disabled && 'opacity-50 cursor-not-allowed hover:text-gray-500',
              )}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}

          {clearable && value && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear input"
              disabled={disabled}
              className={clsx(
                'text-gray-400 hover:text-red-500 transition-colors p-1',
                disabled && 'opacity-50 cursor-not-allowed hover:text-gray-400',
              )}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'
