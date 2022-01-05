import React from 'react';
import PropTypes from 'prop-types';

import ListIcon from '@material-ui/icons/List';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Add from '@material-ui/icons/Add';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import PlayArrow from '@material-ui/icons/PlayArrow';
import VideogameAsset from '@material-ui/icons/VideogameAsset';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import Money from '@material-ui/icons/AttachMoney';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Person from '@material-ui/icons/Person';
import Clear from '@material-ui/icons/Clear';
import Message from '@material-ui/icons/Message';
import Receipt from '@material-ui/icons/Receipt';
import Login from '@material-ui/icons/Lock';
import Loan from '@material-ui/icons/Money';
import Download from '@material-ui/icons/GetApp';
import HomeIcon from '@material-ui/icons/Home';
import BarChart from '@material-ui/icons/BarChart';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import AccountBalance from '@material-ui/icons/AccountBalance';
import MailIcon from '@material-ui/icons/Mail';
import TheatreIcon from '@material-ui/icons/Theaters';
import LocalDIning from '@material-ui/icons/LocalDining';
import LocalGroceryStore from '@material-ui/icons/LocalGroceryStore';
import Commute from '@material-ui/icons/Commute';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import LocalMall from '@material-ui/icons/LocalMall';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import LocalHospital from '@material-ui/icons/LocalHospital';
import LocalTaxi from '@material-ui/icons/LocalTaxi';
import Policy from '@material-ui/icons/EnhancedEncryption';
import AirplanemodeActive from '@material-ui/icons/AirplanemodeActive';
import AirportShuttle from '@material-ui/icons/AirportShuttle';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Room from '@material-ui/icons/Room';
import AttachFile from '@material-ui/icons/AttachFile';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Autorenew from '@material-ui/icons/Autorenew';
import BeachAccess from '@material-ui/icons/BeachAccess';
import Call from '@material-ui/icons/Call';
import CameraAlt from '@material-ui/icons/CameraAlt';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import KingBed from '@material-ui/icons/CardGiftcard';
import Code from '@material-ui/icons/Code';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import People from '@material-ui/icons/People';
import TrackChanges from '@material-ui/icons/TrackChanges';
import Star from '@material-ui/icons/Star';
import Theaters from '@material-ui/icons/Theaters';
import Facebook from '@material-ui/icons/Facebook';
import Twitter from '@material-ui/icons/Twitter';
import TwoWheeler from '@material-ui/icons/TwoWheeler';
import RssFeed from '@material-ui/icons/RssFeed';
import CenterFocusWeak from '@material-ui/icons/CenterFocusWeak';
import NetworkWifi from '@material-ui/icons/NetworkWifi';
import Wifi from '@material-ui/icons/Wifi';
import LinkedIn from '@material-ui/icons/LinkedIn';
import Link from '@material-ui/icons/Link';
import Check from '@material-ui/icons/Check';
import Instagram from '@material-ui/icons/Instagram';
import Adjust from '@material-ui/icons/Adjust';
import CheckCircle from '@material-ui/icons/CheckCircle';
import {
  Email,
  MailOutline,
  YouTube,
  RadioButtonChecked,
  RadioButtonUnchecked,
  DonutLarge,
  Assessment,
  BubbleChart,
  TrendingUp,
  TrendingDown,
  PieChart,
  EventNote,
  TableChart,
  CreditCard,
  Close,
  Search,
  ArrowDropUp,
  ArrowRight,
  ArrowLeft,
  ArrowDropDown,
  Cancel,
  FolderShared,
  Share
} from '@material-ui/icons';

import { ReactComponent as NotificationIcon } from '../../assets/svg/notification.svg';
import { ReactComponent as SettingsIcon } from '../../assets/svg/settings-gears.svg';
import { ReactComponent as NoIcon } from '../../assets/svg/file-1.svg';
import { ReactComponent as InfoIcon } from '../../assets/svg/icons8-info.svg';
import { ReactComponent as WarningIcon } from '../../assets/svg/warning.svg';
import { ReactComponent as ErrorIcon } from '../../assets/svg/error.svg';
import { ReactComponent as ExitIcon } from '../../assets/svg/exit-1.svg';
import { ReactComponent as LogoutIcon } from '../../assets/svg/logout.svg';
import { ReactComponent as DashboardIcon } from '../../assets/svg/dashboard.svg';
import { ReactComponent as HelpIcon } from '../../assets/svg/question-mark.svg';
import { ReactComponent as Calendar } from '../../assets/svg/calendar.svg';
import { ReactComponent as User } from '../../assets/svg/user.svg';

import { getValue } from '../../utils/properties';
import './icon.scss';

const types = {
  app: {},
  system: {
    NoIcon: NoIcon,
    expand: ExpandMore,
    collapse: ExpandLess,
    close: HighlightOff,
    radiouncheck: RadioButtonUnchecked,
    radiochecked: RadioButtonChecked,
    adduser: PersonAdd,
    cancel: Cancel,
    info: InfoIcon,
    close: Close,
    verifieduser: VerifiedUser,
    checkcircle: CheckCircle,
    clear: Clear,
    person: Person,
    warning: WarningIcon,
    exit: ExitIcon,
    logout: LogoutIcon,
    error: ErrorIcon,
    more: MoreVertIcon,
    share: Share,
    erroroutline: ErrorOutline,
    calendar: Calendar,
    'arrow-up': KeyboardArrowUp,
    check: Check,
    'arrow-down': KeyboardArrowDown,
    'arrow-left': ChevronLeft,
    'arrow-right': ChevronRight,
    focus: CenterFocusWeak,
    'email-outline': MailOutline,
    email: Email,
    youtube: YouTube,
    adjust: Adjust,
    facebook: Facebook,
    twitter: Twitter,
    linkedin: LinkedIn,
    bike: TwoWheeler,
    arrowdropup: ArrowDropUp,
    arrowdropdown: ArrowDropDown,
    arrowleft: ArrowLeft,
    arrowright: ArrowRight
  },
  basic: {
    code: Code,
    star: Star,
    shared: FolderShared,
    location: Room,
    eventnote: EventNote,
    gamesport: VideogameAsset,
    trackchanges: TrackChanges,
    message: Message,
    theaters: Theaters,
    people: People,
    playcircle: PlayCircleFilled,
    playarrow: PlayArrow,
    giftcard: CardGiftcard,
    creditcard: CreditCard,
    camera: CameraAlt,
    beach: BeachAccess,
    call: Call,
    autorenew: Autorenew,
    assignment: AssignmentTurnedIn,
    furniture: KingBed,
    shoppingcart: ShoppingCart,
    flight: AirplanemodeActive,
    shuttle: AirportShuttle,
    allinclusive: AllInclusive,
    file: AttachFile,
    home: HomeIcon,
    login: Login,
    mail: MailIcon,
    theatres: TheatreIcon,
    power: OfflineBolt,
    shopping: LocalMall,
    policy: Policy,
    car: LocalTaxi,
    commute: Commute,
    hospital: LocalHospital,
    groceries: LocalGroceryStore,
    food: LocalDIning,
    notification: NotificationIcon,
    download: Download,
    dashboard: DashboardIcon,
    help: HelpIcon,
    settings: SettingsIcon,
    user: User,
    list: ListIcon,
    add: Add,
    transactions: Receipt,
    expenses: MonetizationOn,
    money: Money,
    loan: Loan,
    account: AccountBalance,
    chart: BarChart,
    donutchart: DonutLarge,
    barchartfilled: Assessment,
    bubblechart: BubbleChart,
    trendingup: TrendingUp,
    search: Search,
    trendingdown: TrendingDown,
    piechart: PieChart,
    tablechart: TableChart,
    instagram: Instagram,
    // Facebook,
    // Twitter,
    // TwoWheeler,
    rssfeed: RssFeed,
    networkwifi: NetworkWifi,
    wifi: Wifi,
    // LinkedIn,
    link: Link
  }
};

const Icon = ({ className = '', img, textIcon, name, variant = 'default', size = 'normal', iconClass = '', row, svg, onClick }) => {
  const list = {
    ...types.basic,
    ...types.system,
    ...types.app
  };
  const finalName = getValue(this, name, row);
  const finalIconClass = getValue(this, iconClass, row);
  const IconToRender = list[finalName] || (textIcon ? undefined : !img ? list.NoIcon : undefined);
  return (
    <div
      className={`sq-icon ${finalIconClass} ${!finalName && textIcon ? 'sq-icon--text-icon' : ''} sq-icon--${
        typeof variant === 'function' ? variant(row) : variant
      } sq-icon--${size} ${className}`}
      data-icon-name={finalName}
      onClick={onClick}
    >
      {!finalName && textIcon && <span className="sq-icon__text">{getValue(this, textIcon, row)}</span>}
      {svg || (IconToRender && <IconToRender />)}
      {img && <img src={img} />}
    </div>
  );
};

Icon.propTypes = {
  name: PropTypes.any,
  svg: PropTypes.node,
  className: PropTypes.string,
  row: PropTypes.object,
  textIcon: PropTypes.any,
  onClick: PropTypes.func,
  variant: PropTypes.any,
  classes: PropTypes.object,
  size: PropTypes.string
};

export default Icon;

export const getIconList = (name) => {
  return types[name] || list;
};

export const registerIcon = (name, icon, group = 'app') => {
  if (types[group] && name && icon) {
    types[group][name] = icon;
  }
};
