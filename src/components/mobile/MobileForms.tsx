import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, AlertCircle, Loader, ChevronDown } from 'lucide-react';

// Types de validation
type ValidationRule = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string) => boolean;
  message?: string;
};

type FieldError = string | null;

// Composant Input Mobile-First
interface MobileInputProps {
  type: 'text' | 'email' | 'tel' | 'number' | 'url';
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  validation?: ValidationRule;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function MobileInput({
  type,
  label,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  validation,
  required = false,
  icon: Icon,
  className = ''
}: MobileInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState<FieldError>(null);
  const [isValidating, setIsValidating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Validation en temps réel
  useEffect(() => {
    if (!isTouched || !validation) return;

    const validateField = () => {
      setIsValidating(true);

      // Required
      if (validation.required && !value) {
        setError(validation.message || 'Ce champ est requis');
        setIsValidating(false);
        return;
      }

      // Pattern
      if (validation.pattern && value && !validation.pattern.test(value)) {
        setError(validation.message || 'Format invalide');
        setIsValidating(false);
        return;
      }

      // Min length
      if (validation.minLength && value.length < validation.minLength) {
        setError(`Minimum ${validation.minLength} caractères`);
        setIsValidating(false);
        return;
      }

      // Max length
      if (validation.maxLength && value.length > validation.maxLength) {
        setError(`Maximum ${validation.maxLength} caractères`);
        setIsValidating(false);
        return;
      }

      // Custom validation
      if (validation.custom && value && !validation.custom(value)) {
        setError(validation.message || 'Valeur invalide');
        setIsValidating(false);
        return;
      }

      // Valid
      setError(null);
      setIsValidating(false);
    };

    // Debounce validation
    const timeout = setTimeout(validateField, 300);
    return () => clearTimeout(timeout);
  }, [value, isTouched, validation]);

  const isValid = isTouched && !error && value.length > 0;
  const hasError = isTouched && error;

  // Input mode for mobile keyboards
  const getInputMode = (): React.HTMLAttributes<HTMLInputElement>['inputMode'] => {
    switch (type) {
      case 'email': return 'email';
      case 'tel': return 'tel';
      case 'number': return 'numeric';
      case 'url': return 'url';
      default: return 'text';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-[#6B1E3E]">*</span>}
      </label>

      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className={`w-5 h-5 transition-colors ${
              isFocused ? 'text-[#6B1E3E]' : 'text-gray-400'
            }`} />
          </div>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setIsTouched(true);
          }}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={getInputMode()}
          required={required}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-12 py-4 text-base border-2 rounded-2xl transition-all focus:outline-none ${
            hasError
              ? 'border-red-500 focus:border-red-500 bg-red-50'
              : isValid
              ? 'border-green-500 focus:border-green-500 bg-green-50'
              : isFocused
              ? 'border-[#6B1E3E] bg-white'
              : 'border-gray-300 bg-white'
          }`}
          style={{
            fontSize: '16px' // Prevents iOS zoom on focus
          }}
        />

        {/* Validation icon */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {isValidating && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Loader className="w-5 h-5 text-gray-400 animate-spin" />
              </motion.div>
            )}
            {!isValidating && isValid && (
              <motion.div
                key="valid"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            )}
            {!isValidating && hasError && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 mt-2 text-sm text-red-600"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Composant Select Mobile-First
interface MobileSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function MobileSelect({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  placeholder = 'Sélectionner...',
  icon: Icon,
  className = ''
}: MobileSelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-[#6B1E3E]">*</span>}
      </label>

      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <Icon className={`w-5 h-5 transition-colors ${
              isFocused ? 'text-[#6B1E3E]' : 'text-gray-400'
            }`} />
          </div>
        )}

        {/* Native select (better on mobile) */}
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={`w-full appearance-none ${Icon ? 'pl-12' : 'pl-4'} pr-12 py-4 text-base border-2 rounded-2xl transition-all focus:outline-none ${
            isFocused
              ? 'border-[#6B1E3E] bg-white'
              : 'border-gray-300 bg-white'
          } ${!value ? 'text-gray-400' : 'text-gray-900'}`}
          style={{
            fontSize: '16px' // Prevents iOS zoom
          }}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown className={`w-5 h-5 transition-colors ${
            isFocused ? 'text-[#6B1E3E]' : 'text-gray-400'
          }`} />
        </div>
      </div>
    </div>
  );
}

// Composant formulaire complet mobile-optimisé
interface MobileFormProps {
  onSubmit: (data: Record<string, string>) => void;
  children: React.ReactNode;
  submitLabel?: string;
  isLoading?: boolean;
  className?: string;
}

export function MobileForm({
  onSubmit,
  children,
  submitLabel = 'Envoyer',
  isLoading = false,
  className = ''
}: MobileFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {children}

      <motion.button
        type="submit"
        disabled={isLoading}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-2xl font-medium text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-xl"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader className="w-5 h-5 animate-spin" />
            Envoi en cours...
          </div>
        ) : (
          submitLabel
        )}
      </motion.button>
    </form>
  );
}

// Validations communes
export const commonValidations = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Email invalide'
  },
  phone: {
    required: true,
    pattern: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
    message: 'Numéro de téléphone français invalide'
  },
  postalCode: {
    required: true,
    pattern: /^\d{5}$/,
    message: 'Code postal invalide (5 chiffres)'
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Nom invalide'
  }
};
