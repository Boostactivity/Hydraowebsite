import React from 'react';
import { useAccessibility } from './AccessibilityProvider';

// Optimized button with screen reader support
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ariaLabel?: string;
  loading?: boolean;
  loadingText?: string;
}

export function AccessibleButton({ 
  children, 
  ariaLabel, 
  loading, 
  loadingText = 'Chargement en cours',
  disabled,
  ...props 
}: AccessibleButtonProps) {
  const { announce } = useAccessibility();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
      if (ariaLabel) {
        announce(`${ariaLabel} activé`);
      }
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      aria-disabled={disabled || loading}
    >
      {loading && (
        <span className="sr-only">{loadingText}</span>
      )}
      {children}
    </button>
  );
}

// Optimized link with clear purpose
interface AccessibleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  external?: boolean;
}

export function AccessibleLink({ children, external, href, ...props }: AccessibleLinkProps) {
  return (
    <a
      {...props}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={external ? `${children} (s'ouvre dans un nouvel onglet)` : undefined}
    >
      {children}
      {external && (
        <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>
      )}
    </a>
  );
}

// Accessible form field with proper labels
interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  hideLabel?: boolean;
}

export function AccessibleInput({ 
  label, 
  error, 
  helperText, 
  hideLabel,
  id,
  required,
  ...props 
}: AccessibleInputProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className={hideLabel ? 'sr-only' : 'block font-semibold text-gray-900'}
      >
        {label}
        {required && (
          <>
            {' '}
            <span className="text-red-600" aria-label="requis">*</span>
          </>
        )}
      </label>
      
      <input
        {...props}
        id={inputId}
        required={required}
        aria-invalid={!!error}
        aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${
          error 
            ? 'border-red-500 focus:border-red-600' 
            : 'border-gray-300 focus:border-[#6B1E3E]'
        }`}
      />
      
      {helperText && !error && (
        <p id={helperId} className="text-sm text-gray-600">
          {helperText}
        </p>
      )}
      
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// Accessible heading with proper hierarchy
interface AccessibleHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export function AccessibleHeading({ level, children, className = '' }: AccessibleHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return React.createElement(
    Tag,
    { className },
    children
  );
}

// Status message for screen readers
interface StatusMessageProps {
  message: string;
  priority?: 'polite' | 'assertive';
  visible?: boolean;
}

export function StatusMessage({ message, priority = 'polite', visible = false }: StatusMessageProps) {
  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className={visible ? 'text-sm text-gray-600 mt-2' : 'sr-only'}
    >
      {message}
    </div>
  );
}

// Progress indicator for screen readers
interface AccessibleProgressProps {
  value: number;
  max?: number;
  label: string;
  showLabel?: boolean;
}

export function AccessibleProgress({ 
  value, 
  max = 100, 
  label, 
  showLabel = true 
}: AccessibleProgressProps) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-900">{label}</span>
          <span className="text-sm text-gray-600">{percentage}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="h-2 bg-gray-200 rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-[#6B1E3E] transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="sr-only">{label}: {percentage}% complété</span>
    </div>
  );
}

// Accessible tab panel
interface AccessibleTabsProps {
  tabs: Array<{ id: string; label: string; content: React.ReactNode }>;
  defaultTab?: string;
}

export function AccessibleTabs({ tabs, defaultTab }: AccessibleTabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);
  const { announce } = useAccessibility();

  const handleTabChange = (tabId: string, tabLabel: string) => {
    setActiveTab(tabId);
    announce(`Onglet ${tabLabel} sélectionné`);
  };

  return (
    <div>
      <div role="tablist" className="flex gap-2 border-b-2 border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => handleTabChange(tab.id, tab.label)}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === tab.id
                ? 'text-[#6B1E3E] border-b-4 border-[#6B1E3E] -mb-0.5'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          className="py-6"
        >
          {activeTab === tab.id && tab.content}
        </div>
      ))}
    </div>
  );
}

// Accessible dialog/modal
interface AccessibleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  closeLabel?: string;
}

export function AccessibleDialog({ 
  isOpen, 
  onClose, 
  title, 
  children,
  closeLabel = 'Fermer'
}: AccessibleDialogProps) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const { announce } = useAccessibility();

  React.useEffect(() => {
    if (isOpen) {
      announce(`Dialogue ouvert: ${title}`, 'assertive');
      dialogRef.current?.focus();
    }
  }, [isOpen, title, announce]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl">
        <h2 id="dialog-title" className="text-2xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        
        <div className="mb-6">
          {children}
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={closeLabel}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// Live region for dynamic content updates
interface LiveRegionProps {
  children: React.ReactNode;
  priority?: 'polite' | 'assertive';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}

export function LiveRegion({ 
  children, 
  priority = 'polite', 
  atomic = true,
  relevant = 'additions text'
}: LiveRegionProps) {
  return (
    <div
      aria-live={priority}
      aria-atomic={atomic}
      aria-relevant={relevant}
      role="region"
    >
      {children}
    </div>
  );
}
