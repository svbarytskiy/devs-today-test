import { useState, type ChangeEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../components/input/Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email', 'search'],
      description: 'Semantic type of the input.',
    },
    clearable: {
      control: 'boolean',
      description: 'Shows an X button to clear the input value.',
    },
    variant: {
      control: 'select',
      options: ['default', 'inverted'],
      description: 'Visual style variant.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The height and font size of the input.',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and changes appearance.',
    },
    placeholder: { control: 'text' },
    value: { control: false },
    onChange: { control: false },
  },
  parameters: {
    controls: { expanded: true, sort: 'requiredFirst' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

const ControlledInputTemplate: Story = {
  render: args => {
    const [inputValue, setInputValue] = useState(
      args.type === 'password' ? 'initial-secret-value' : args.value || '',
    )

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      if (args.onChange) {
        args.onChange(e)
      }
    }

    return (
      <div className="p-8 w-full max-w-md">
        <Input {...args} value={inputValue} onChange={handleChange} />
      </div>
    )
  },
}

export const DefaultText: Story = {
  ...ControlledInputTemplate,
  args: {
    type: 'text',
    placeholder: 'Enter your name...',
    clearable: false,
    value: 'Some text',
    size: 'md',
  },
}

export const ClearableText: Story = {
  ...ControlledInputTemplate,
  args: {
    type: 'text',
    placeholder: 'Try clearing me!',
    clearable: true,
    value: 'Some text to clear',
    size: 'md',
  },
}

export const PasswordInput: Story = {
  ...ControlledInputTemplate,
  args: {
    type: 'password',
    placeholder: 'Enter your password',
    clearable: false,
    value: 'secret-123',
    size: 'md',
  },
  name: 'Password',
}

export const DisabledInput: Story = {
  ...ControlledInputTemplate,
  args: {
    type: 'text',
    placeholder: 'This text cannot be changed.',
    value: 'Disabled',
    disabled: true,
    clearable: true,
    size: 'md',
  },
  name: 'Disabled',
}

const SizeShowcaseTemplate: Story = {
  render: args => {
    const sizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg']
    const [inputValue, setInputValue] = useState('Text')

    return (
      <div className="p-8 w-full space-y-6 max-w-sm">
        {sizes.map(s => (
          <div key={s}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Size: {s.toUpperCase()}
            </label>
            <Input
              {...args}
              size={s}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={`Input with size ${s.toUpperCase()}`}
            />
          </div>
        ))}
      </div>
    )
  },
}

export const SizeVariations: Story = {
  ...SizeShowcaseTemplate,
  args: {
    clearable: true,
    type: 'text',
  },
  name: 'Size (sm, md, lg)',
  argTypes: { size: { control: false } },
}

export const InvertedVariant: Story = {
  ...ControlledInputTemplate,
  args: {
    type: 'text',
    placeholder: 'Inverted background',
    clearable: true,
    value: 'Using the inverted variant',
    variant: 'inverted',
    size: 'lg',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  name: 'Inverted Input',
}
