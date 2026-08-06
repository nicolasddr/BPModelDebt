import type { ComponentProps, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center gap-1.5 rounded border disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border-accent bg-accent text-white hover:bg-accent/90",
  secondary: "border-border-strong bg-transparent text-ink hover:bg-s1",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-[34px] px-3.5 text-[13px]",
  md: "h-[38px] px-5 text-[14px]",
  lg: "h-[46px] rounded-[10px] px-7 text-[15px] font-medium",
};

function buttonClassName(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  return [baseClasses, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(" ");
}

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

type ButtonAsButtonProps = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLinkProps = ButtonOwnProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonOwnProps> & {
    href: ComponentProps<typeof Link>["href"];
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({ variant = "primary", size = "sm", className, children, ...rest }: ButtonProps) {
  const classes = buttonClassName(variant, size, className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
