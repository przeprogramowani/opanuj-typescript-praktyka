import { TextProps, BaseText } from './BaseText';

export default function withItalics(WrappedComponent = BaseText) {
  return function ItalicComponent({ text }: TextProps) {
    return (
      <span className="italic" data-testid="italic">
        <WrappedComponent text={text} />
      </span>
    );
  };
}
