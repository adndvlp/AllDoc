export type PythonPackage = {name: string; version: string; file_name: string; sha256: string; depends: string[];
  install_dir?: string; imports?: string[]; package_type?: string; shared_library?: boolean};
export type PythonLock = {info: Record<string, string>; packages: Record<string, PythonPackage>};
export function compatiblePythonPin<T extends {runtimeVersion: string}>(version: string, pinned: T | undefined, update = false): T | undefined {
  return !update && pinned?.runtimeVersion === version ? pinned : undefined;
}
export function selectPythonPackages(lock: PythonLock, roots: readonly string[]): Record<string, PythonPackage> {
  const selected = new Map<string, PythonPackage>(); const visiting = new Set<string>();
  function visit(name: string) {
    if (visiting.has(name)) throw new Error('Ciclo de dependencias Python: ' + name);
    if (selected.has(name)) return;
    const value = lock.packages[name];
    if (!value || value.name !== name || !value.version || !/^[a-zA-Z0-9][a-zA-Z0-9_.+-]*\.whl$/.test(value.file_name)
      || !/^[a-f0-9]{64}$/.test(value.sha256) || !Array.isArray(value.depends)) throw new Error('Paquete Python inválido: ' + name);
    visiting.add(name); for (const dependency of value.depends) visit(dependency); visiting.delete(name);
    selected.set(name, structuredClone(value));
  }
  for (const name of roots) visit(name);
  return Object.fromEntries([...selected].sort(([a], [b]) => a.localeCompare(b, 'en')));
}
