import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

const base = 'inline-flex items-center justify-center gap-2 rounded-[0.625rem] font-semibold whitespace-nowrap transition-colors duration-150 disabled:opacity-55 disabled:pointer-events-none select-none';

const variants = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm',
  navy: 'bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950 shadow-sm',
  outline: 'bg-white text-navy-900 border border-navy-200 hover:border-navy-700 hover:bg-navy-50',
  ghost: 'text-navy-900 hover:bg-navy-50',
  subtle: 'bg-navy-50 text-navy-900 hover:bg-navy-100',
  danger: 'bg-danger text-white hover:bg-red-700 shadow-sm',
  dangerOutline: 'bg-white text-danger border border-red-200 hover:bg-danger-50',
  white: 'bg-white text-navy-900 hover:bg-navy-50 shadow-sm',
  glass: 'bg-white/10 text-white border border-white/30 hover:bg-white/20',
};

const sizes = {
  sm: 'min-h-9 px-3 text-[0.8125rem]',
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-6 text-[0.9375rem]',
};

/**
 * The one button used across TradeSphere. Pass `to` for an internal link or `href`
 * for an external one; otherwise it renders a <button>.
 */
const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', to, href, icon: Icon, iconRight: IconRight, loading = false, full = false, className = '', children, type = 'button', disabled, ...rest },
  ref,
) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${full ? 'w-full' : ''} ${className}`;
  const content = (
    <>
      {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : Icon ? <Icon className="size-4 shrink-0" aria-hidden="true" /> : null}
      {children}
      {IconRight && !loading ? <IconRight className="size-4 shrink-0" aria-hidden="true" /> : null}
    </>
  );

  if (to) return <Link ref={ref} to={to} className={classes} {...rest}>{content}</Link>;
  if (href) return <a ref={ref} href={href} className={classes} {...rest}>{content}</a>;
  return (
    <button ref={ref} type={type} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  );
});

export default Button;

/** Square icon-only button. `label` is required for screen readers. */
export const IconButton = forwardRef(function IconButton({ icon: Icon, label, className = '', size = 'md', tone = 'default', ...rest }, ref) {
  const dimension = size === 'sm' ? 'size-9' : 'size-11';
  const tones = {
    default: 'text-navy-900 hover:bg-navy-50',
    light: 'text-white hover:bg-white/10',
    danger: 'text-danger hover:bg-danger-50',
    muted: 'text-muted hover:bg-navy-50 hover:text-navy-900',
  };
  return (
    <button ref={ref} type="button" aria-label={label} title={label} className={`inline-flex ${dimension} shrink-0 items-center justify-center rounded-[0.625rem] transition-colors disabled:opacity-50 ${tones[tone]} ${className}`} {...rest}>
      <Icon className="size-5" aria-hidden="true" />
    </button>
  );
});
