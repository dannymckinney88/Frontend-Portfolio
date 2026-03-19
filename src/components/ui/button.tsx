/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive aria-invalid:ring-offset-2 aria-invalid:ring-offset-background dark:aria-invalid:border-destructive/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: `
          rounded-xl border border-primary bg-primary text-primary-foreground shadow-sm
          hover:bg-background hover:text-primary hover:border-primary hover:shadow-sm
          active:bg-primary/90 active:text-primary-foreground active:shadow-inner active:translate-y-px active:scale-[0.98]
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
         `,

        outline: `
          rounded-xl border border-foreground/25 bg-background text-foreground shadow-sm
          hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-sm
          active:border-primary active:bg-background active:text-primary active:shadow-inner active:translate-y-px active:scale-[0.98]
          aria-expanded:border-primary aria-expanded:bg-primary aria-expanded:text-primary-foreground
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
        `,

        secondary: `
          rounded-xl border border-transparent bg-secondary text-secondary-foreground shadow-sm
          hover:bg-secondary/80 hover:shadow-md
          active:bg-secondary/70 active:shadow-inner active:translate-y-px active:scale-[0.98]
          aria-expanded:bg-secondary aria-expanded:text-secondary-foreground
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
        `,

        ghost: `
          rounded-xl border border-transparent text-foreground
          hover:bg-muted hover:text-foreground hover:shadow-sm
          active:bg-muted active:text-foreground active:shadow-inner active:translate-y-px active:scale-[0.98]
          aria-expanded:bg-muted aria-expanded:text-foreground
          dark:hover:bg-muted/50
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
        `,

        destructive: `
          rounded-xl border border-destructive/20 bg-destructive/10 text-destructive shadow-sm
          hover:bg-destructive/20 hover:shadow-md
          active:bg-destructive/25 active:text-destructive active:shadow-inner active:translate-y-px active:scale-[0.98]
          focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-background
          dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:active:bg-destructive/35
        `,

        link: `
          rounded-md border-transparent text-primary underline-offset-4
          hover:underline
          active:text-primary/80 active:underline
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
        `,
      },

      size: {
        default:
          'h-10 min-w-30 gap-1.5 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',

        xs: "h-7 min-w-20 gap-1 px-2 text-xs rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",

        sm: "h-8 min-w-24 gap-1.5 px-3 text-sm rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",

        lg: 'h-11 min-w-32 gap-1.5 px-5 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',

        icon: 'size-10 rounded-xl',
        'icon-xs': "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8 rounded-lg',
        'icon-lg': 'size-11 rounded-xl',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
