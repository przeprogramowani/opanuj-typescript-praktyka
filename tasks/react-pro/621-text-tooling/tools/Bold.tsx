import { TextProps, BaseText } from './BaseText';

export default function withBold(WrappedComponent = BaseText) {
  return function BoldComponent({ text }: TextProps) {
    return (
      <span className="font-bold" data-testid="bold">
        <WrappedComponent text={text} />
      </span>
    );
  };
}
