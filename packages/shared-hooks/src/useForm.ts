import { useState, useCallback } from "react";

interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
) {
  const [values, setValues] = useState<T>(options.initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (name: keyof T, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate on blur if validation function exists
      if (options.validate) {
        const validationErrors = options.validate(values);
        if (validationErrors[name]) {
          setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
        }
      }
    },
    [values, options.validate]
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      setIsSubmitting(true);

      try {
        // Validate all fields
        if (options.validate) {
          const validationErrors = options.validate(values);
          setErrors(validationErrors);

          // If there are errors, don't submit
          if (Object.keys(validationErrors).length > 0) {
            setIsSubmitting(false);
            return;
          }
        }

        await options.onSubmit(values);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, options]
  );

  const reset = useCallback(() => {
    setValues(options.initialValues);
    setErrors({});
    setTouched({});
  }, [options.initialValues]);

  const setFieldValue = useCallback(
    (name: keyof T, value: string) => {
      handleChange(name, value);
    },
    [handleChange]
  );

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
  };
}
