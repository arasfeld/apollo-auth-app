import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import HomeIcon from '@material-ui/icons/Home'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import StarIcon from '@material-ui/icons/Star'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'

export default [
  {
    title: 'Subheader 1',
    pages: [
      {
        title: 'Favorites',
        href: '/favorites',
        icon: StarIcon,
      },
      {
        title: 'Popular',
        href: '/popular',
        icon: TrendingUpIcon,
      },
      {
        title: 'Deals',
        href: '/deals',
        icon: AttachMoneyIcon,
      },
      {
        title: 'Local Offers',
        href: '/offers',
        icon: LocalOfferIcon,
      }
    ]
  },
  {
    title: 'Subheader 2',
    pages: [
      {
        title: 'Home',
        href: '/',
        icon: HomeIcon,
      },
      {
        title: 'Parent Link',
        href: '/parent',
        icon: TrendingUpIcon,
        children: [
          {
            title: 'Child Link 1',
            href: '/child-2',
          },
          {
            title: 'Child Link 2',
            href: '/child-2',
          }
        ]
      }
    ]
  }
]
