import { useState } from 'react';

interface TextProcessorProps {
  text: string;
  setText: (text: string) => void;
}

interface TextProcessorComponentProps {
  children: (props: TextProcessorProps) => React.ReactNode;
}

export default function TextProcessor({ children }: TextProcessorComponentProps) {
  const [text, setText] = useState('Prezentujemy nowy procesor tekstu!');

  return children({
    text,
    setText,
  });
}
