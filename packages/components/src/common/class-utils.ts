const CLASS_PREFIX = 'ef'

export const withPrefix = function(className: string, args?: any) {
  return `${CLASS_PREFIX}-${className}`
}
