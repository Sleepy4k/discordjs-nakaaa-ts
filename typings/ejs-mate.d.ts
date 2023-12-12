/**
 * Coding service by Sleepy4k <sarahpalastring@gmail.com>
 *
 * Reselling this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by:
 * Apri Pandu Wicaksono
 *
 * Link: https://github.com/sleepy4k
 *
 * March 12, 2023
 */
declare module "ejs-mate" {
  class Block {
    constructor();
    toString(): string;
    append(str: string): void;
    prepend(str: string): void;
    replace(str: string): void;
  }

  function lookup(root: string, partials: string, options: object): string;
  function partial(view: string): string;
  function layout(view: string): void;
  function block(name: string, html: string): Block;
  function compile(file: string, options: object, cb: (e: any, rendered?: string | undefined) => void): void;
  function renderFile(file: string, options: object, fn: (e: any, rendered?: string | undefined) => void): void;

  renderFile.compile = compile;
  renderFile.partial = partial;
  renderFile.block = block;
  renderFile.layout = layout;

  export = renderFile;
}
