export const compactNumber = (value) => value >= 1000 ? `${(value / 1000).toFixed(1).replace('.0', '')}k` : String(value)
export const formatDate = (value) => new Date(value).toLocaleDateString('en-GB')
