export function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}

export const text = (value: unknown): value is string => typeof value === 'string' && value.length <= 1_048_576;
export const identifier = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0 && value.length <= 256;
export const counter = (value: unknown): value is number => Number.isSafeInteger(value) && (value as number) >= 0;

export function datasetReference(value: unknown): boolean {
  return record(value) && identifier(value.id) && counter(value.version) && value.version > 0;
}
