import {
  Activity,
  Camera,
  Trophy,
  LibraryBig,
  QrCode,
  ShieldUser,
} from 'lucide-react'

const menus = [
  {
    name: '簽到',
    url: '/signin',
    icon: Camera,
    roles: ['ADMIN', 'CDC_MEMBER', 'NON_CDC_MEMBER'],
  },
  {
    name: '活動一覽',
    url: '/activity',
    icon: Activity,
    roles: ['ADMIN', 'CDC_MEMBER', 'NON_CDC_MEMBER'],
  },
  {
    name: '排行榜',
    url: '/rank',
    icon: Trophy,
    roles: ['ADMIN'],
  },
  {
    name: '個人紀錄',
    url: '/record',
    icon: LibraryBig,
    roles: ['ADMIN', 'CDC_MEMBER', 'NON_CDC_MEMBER'],
  },
  {
    name: '今日活動',
    url: '/today_activity',
    icon: QrCode,
    roles: ['ADMIN'],
  },
  {
    name: '管理者頁面',
    url: '/admin',
    icon: ShieldUser,
    roles: ['ADMIN'],
  },
]

export default menus
