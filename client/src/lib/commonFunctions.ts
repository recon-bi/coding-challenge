export const handleChange(event: any) => {
  const { name, value } = event.target
  return {[name]: value}
}