import {rPackages} from './environment.ts';

const available = new Set<string>(rPackages);
export function rPackageReferences(code: string) {
  const names = code.replace(/^\s*#.*$/gm, '').matchAll(/\b([\w.]+)::|\b(?:library|require|requireNamespace|packageVersion)\(\s*["']?([\w.]+)/g);
  return Array.from(new Set(Array.from(names, match => match[1] ?? match[2]).filter(name => available.has(name))));
}
