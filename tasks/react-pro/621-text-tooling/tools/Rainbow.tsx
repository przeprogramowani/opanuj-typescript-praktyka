import { TextProps, BaseText } from './BaseText';

export default function withRainbow(WrappedComponent = BaseText) {
  return function RainbowComponent({ text }: TextProps) {
    const characters = (text as string).split('').map((char: string, index: number) => {
      const hue = Math.floor((index / (text as string).length) * 360);
      return (
        <span key={index} style={{ color: `hsl(${hue}, 80%, 50%)` }}>
          {char}
        </span>
      );
    });

    return (
      <span data-testid="rainbow">
        <WrappedComponent text={characters} />
      </span>
    );
  };
}
