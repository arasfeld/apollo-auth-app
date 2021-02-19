export interface NavItem {
  children?: NavItem[]
  href?: string
  icon?: React.FC<React.HTMLAttributes<HTMLOrSVGElement>>
  title?: string
}
