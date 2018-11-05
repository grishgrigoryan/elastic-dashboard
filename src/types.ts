declare module '@elastic/eui' {
  export const EuiCard: any;
  export const EuiInMemoryTable: any;
}
declare namespace Parse {
  class Schema extends Object {
    static all(): Promise<Array<any>>;

    delete(): Promise<Array<any>>;
  }
}
