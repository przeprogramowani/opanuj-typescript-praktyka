import React, { useState } from 'react';
import { FormContext } from './context';
import { SurveyProps } from './types';
import { ShortAnswer } from './controls/ShortAnswer';
import { LongAnswer } from './controls/LongAnswer';
import { Choice } from './controls/Choice';
import { Submit } from './controls/Submit';

const Survey = ({ children, onSubmit }: SurveyProps) => {
  const [values, setValues] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <FormContext.Provider value={{ handleSubmit, values, setValues }}>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {children}
      </form>
    </FormContext.Provider>
  );
};

Survey.ShortAnswer = ShortAnswer;
Survey.LongAnswer = LongAnswer;
Survey.Choice = Choice;
Survey.Submit = Submit;

export default Survey;
