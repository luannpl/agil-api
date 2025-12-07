function cleanField(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}
export { cleanField };
