declare module 'minimatch' {
  interface IOptions {
    debug?: boolean;
    nobrace?: boolean;
    noglobstar?: boolean;
    dot?: boolean;
    noext?: boolean;
    nocase?: boolean;
    nonull?: boolean;
    matchBase?: boolean;
    nocomment?: boolean;
    nonegate?: boolean;
    flipNegate?: boolean;
  }

  interface IMinimatch {
    pattern: string;
    options: IOptions;
    set: string[][];
    regexp: RegExp | null;
    negate: boolean;
    comment: boolean;
    empty: boolean;
  }

  function minimatch(target: string, pattern: string, options?: IOptions): boolean;
  
  namespace minimatch {
    function filter(pattern: string, options?: IOptions): (target: string) => boolean;
    function match(list: string[], pattern: string, options?: IOptions): string[];
    class Minimatch implements IMinimatch {
      constructor(pattern: string, options?: IOptions);
      pattern: string;
      options: IOptions;
      set: string[][];
      regexp: RegExp | null;
      negate: boolean;
      comment: boolean;
      empty: boolean;
      match(target: string): boolean;
      makeRe(): RegExp | false;
    }
  }

  export = minimatch;
}
