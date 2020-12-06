const priceFormatter = (value: string): string => {
  if (value == 'soon') {
    return ''
  }

  const styledValue = `Php ${parseFloat(value).toFixed(2)}`

  return styledValue
}

export default priceFormatter