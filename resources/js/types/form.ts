import React from 'react';

export interface FormFieldProps {
  label: string;
  type?: string;
  name: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  required?: boolean;
  placeholder?: string;
}