import React from 'react'

export type LordiconIcons =
  | 'bolt'
  | 'helpCenter'
  | 'info'
  | 'notificationBell'
  | 'error'
  | 'warning'
  | 'helpQuestion'
  | 'alarm'
  | 'arrowUp'
  | 'wings'
  | 'arrowDown'
  | 'chat'
  | 'clock'
  | 'autorenew'
  | 'article'
  | 'nightSky'
  | 'history'
  | 'trash'
  | 'play'
  | 'editDocument'
  | 'confetti'
  | 'addCard'
  | 'folder'
  | 'thumbsUpDown'
  | 'cross'
  | 'nightSky'
  | 'consultation'
  | 'spaFlower'
  | 'book'
  | 'share'
  | 'snake'
  | 'ruins'
  | 'privacyPolicy'
  | 'edit'
  | 'bin'
  | 'flatArrow'
  | 'camera'
  | 'checkInBox'

export type LordiconTrigger =
  | 'hover'
  | 'click'
  | 'loop'
  | 'loop-on-hover'
  | 'morph'
  | 'morph-two-way'

export type LordiconColors = {
  primary?: string
  secondary?: string
}

export type LordiconProps = {
  icon?: LordiconIcons
  colors?: LordiconColors
  trigger?: LordiconTrigger

  delay?: number | string
  size?: number | string
} & React.HtmlHTMLAttributes<HTMLDivElement>

export type LordiconElement = HTMLElement & {
  src?: string
  trigger?: LordiconTrigger
  colors?: LordiconColors
  delay?: string | number
}

export const Lordicon: React.FC<LordiconProps> = ({
  colors = {
    primary: '#fff',
    secondary: '#fff'
  },
  icon = 'helpCenter',
  delay = 1000,
  trigger = 'loop',
  size = 20,
  ...rest
}) => {
  const cdnLordiconBaseUrl = 'https://cdn.lordicon.com/'

  const lordiconIcons: Record<LordiconIcons, string> = {
    confetti: 'lupuorrc',
    checkInBox: 'jvihlqtw',
    share: 'udwhdpod',
    wings: 'hpxruznz',
    bolt: 'giaigwkd',
    book: 'wxnxiano',
    helpCenter: 'njjuilvq',
    info: 'aixyixpa',
    notificationBell: 'ndydpcaq',
    error: 'tdrtiskw',
    warning: 'rslnizbt',
    helpQuestion: 'keogyrep',
    alarm: 'rinkvymq',
    nightSky: 'tgnqhsfe',
    arrowUp: 'eflfmgmj',
    arrowDown: 'xhdhjyqy',
    chat: 'uvextprq',
    clock: 'abgtphux',
    autorenew: 'sihdhmit',
    trash: 'dovoajyj',
    article: 'sygggnra',
    history: 'lefmybnc',
    play: 'fetyzpiw',
    addCard: 'auvicynv',
    thumbsUpDown: 'rahcoaeu',
    cross: 'vfzqittk',
    spaFlower: 'dqunxaob',
    snake: 'jlkaerma',
    ruins: 'uixzulhh',
    editDocument: 'puvaffet',
    privacyPolicy: 'yyecauzv',
    edit: 'wloilxuq',
    bin: 'gsqxdxog',
    flatArrow: 'iifryyua',
    camera: 'vixtkkbk',
    consultation: 'zpxybbhl',
    folder: 'bbnkwdur',
  }

  const lordiconIcon = `${lordiconIcons[icon]}.json`

  const lordicon = (
    <lord-icon
      colors={`primary:${colors.primary},secondary:${colors.secondary}`}
      src={`${cdnLordiconBaseUrl}${lordiconIcon}`}
      trigger={trigger}
      delay={delay}
      {...rest}
      style={{
        minWidth: size,
        height: size,
        ...(rest.style ? rest.style : {})
      }}
    />
  )

  return lordicon
}

export default Lordicon
