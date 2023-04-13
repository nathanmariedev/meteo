export class Search {
  columns: string[];
  value: string;

  constructor(columns: string[], value: string) {
    this.columns = columns;
    this.value = value;
  }
}
