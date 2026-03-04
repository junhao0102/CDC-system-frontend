const ROLE_CONFIG = {
  ADMIN: {
    label: '管理員',
    className: 'bg-red-100 text-red-700 border-red-200',
  },
  CDC_MEMBER: {
    label: '社員',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  NON_CDC_MEMBER: {
    label: '非社員',
    className: 'bg-slate-100 text-slate-600 border-slate-200',
  },
} as const

type UserRole = keyof typeof ROLE_CONFIG

export { ROLE_CONFIG, type UserRole }
