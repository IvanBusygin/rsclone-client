export interface ISelectProps {
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}
