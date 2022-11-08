import React from 'react';
import PropTypes from 'prop-types';

import ListIcon from '@mui/icons-material/List';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HighlightOff from '@mui/icons-material/HighlightOff';
import Add from '@mui/icons-material/Add';
import PlayCircleFilled from '@mui/icons-material/PlayCircleFilled';
import PlayArrow from '@mui/icons-material/PlayArrow';
import VideogameAsset from '@mui/icons-material/VideogameAsset';
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import DragHandle from '@mui/icons-material/DragHandle';
import Money from '@mui/icons-material/AttachMoney';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Person from '@mui/icons-material/Person';
import Clear from '@mui/icons-material/Clear';
import Message from '@mui/icons-material/Message';
import Receipt from '@mui/icons-material/Receipt';
import Login from '@mui/icons-material/Lock';
import Loan from '@mui/icons-material/Money';
import Download from '@mui/icons-material/GetApp';
import HomeIcon from '@mui/icons-material/Home';
import BarChart from '@mui/icons-material/BarChart';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import AccountBalance from '@mui/icons-material/AccountBalance';
import MailIcon from '@mui/icons-material/Mail';
import TheatreIcon from '@mui/icons-material/Theaters';
import LocalDIning from '@mui/icons-material/LocalDining';
import LocalGroceryStore from '@mui/icons-material/LocalGroceryStore';
import Commute from '@mui/icons-material/Commute';
import OfflineBolt from '@mui/icons-material/OfflineBolt';
import LocalMall from '@mui/icons-material/LocalMall';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import LocalHospital from '@mui/icons-material/LocalHospital';
import LocalTaxi from '@mui/icons-material/LocalTaxi';
import Policy from '@mui/icons-material/EnhancedEncryption';
import AirplanemodeActive from '@mui/icons-material/AirplanemodeActive';
import AirportShuttle from '@mui/icons-material/AirportShuttle';
import AllInclusive from '@mui/icons-material/AllInclusive';
import Room from '@mui/icons-material/Room';
import AttachFile from '@mui/icons-material/AttachFile';
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';
import Autorenew from '@mui/icons-material/Autorenew';
import BeachAccess from '@mui/icons-material/BeachAccess';
import Call from '@mui/icons-material/Call';
import CameraAlt from '@mui/icons-material/CameraAlt';
import CardGiftcard from '@mui/icons-material/CardGiftcard';
import KingBed from '@mui/icons-material/CardGiftcard';
import Code from '@mui/icons-material/Code';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import People from '@mui/icons-material/People';
import TrackChanges from '@mui/icons-material/TrackChanges';
import Star from '@mui/icons-material/Star';
import Theaters from '@mui/icons-material/Theaters';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import TwoWheeler from '@mui/icons-material/TwoWheeler';
import RssFeed from '@mui/icons-material/RssFeed';
import CenterFocusWeak from '@mui/icons-material/CenterFocusWeak';
import NetworkWifi from '@mui/icons-material/NetworkWifi';
import Wifi from '@mui/icons-material/Wifi';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Link from '@mui/icons-material/Link';
import Check from '@mui/icons-material/Check';
import Instagram from '@mui/icons-material/Instagram';
import Adjust from '@mui/icons-material/Adjust';
import CheckCircle from '@mui/icons-material/CheckCircle';

import { ReactComponent as PHigh } from '../../assets/svg/p-hightest.svg';
import { ReactComponent as PMedium } from '../../assets/svg/p-medium.svg';
import { ReactComponent as PLow } from '../../assets/svg/p-low.svg';
import { ReactComponent as SortN } from '../../assets/svg/sort-n.svg';
import { ReactComponent as SortAsc } from '../../assets/svg/sort-asc.svg';
import { ReactComponent as SortDesc } from '../../assets/svg/sort-desc.svg';

import {
  Email,
  MailOutline,
  FileCopy,
  PriorityHigh,
  YouTube,
  RadioButtonChecked,
  RadioButtonUnchecked,
  DonutLarge,
  HideImage,
  Assessment,
  BubbleChart,
  TrendingUp,
  TrendingDown,
  PieChart,
  EventNote,
  TableChart,
  CreditCard,
  Label,
  Close,
  Search,
  ArrowDropUp,
  ArrowRight,
  ArrowLeft,
  ArrowDropDown,
  Cancel,
  FolderShared,
  Share,
  GroupWork,
  CalendarMonth,
  ExitToApp,
  Notifications,
  SettingsApplications,
  Article,
  Info as InfoIcon,
  WarningAmber as WarningIcon,
  ErrorOutline as ErrorIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Help as HelpIcon,
  Person as User,
  Block,
  Edit,
  Restore,
  Key,
  NotInterested,
  RestartAlt,
  AccessAlarms,
  AccessTime,
  AcUnit,
  AddToQueue,
  AddComment,
  AccountCircle,
  Save,
  SaveAs,
  LibraryAdd,
  PowerSettingsNew,
  AddCircleOutline,
  AddCircle,
  Book,
  LockOpen,
  AddTask,
  AddToPhotos,
  Analytics,
  Apps,
  Assistant,
  Build,
  BuildCircle,
  Cast,
  CastConnected,
  ChatBubbleOutline,
  ChatBubble,
  Chat,
  ChangeCircle,
  CheckCircleOutline,
  ClearAll,
  Comment,
  CommentsDisabled,
  ContactSupport,
  Contacts,
  DateRange,
  DoDisturbOn,
  DoNotDisturb,
  DownloadForOffline,
  EditAttributes,
  EditOff,
  ElectricBolt,
  Language,
  LightbulbCircle,
  Lightbulb,
  LightMode,
  Loyalty,
  Favorite,
  FavoriteBorder,
  FiberNew,
  Folder,
  FolderCopy,
  GppGood,
  GppMaybe,
  GppBad,
  Garage,
  MarkUnreadChatAlt,
  Shield,
} from '@mui/icons-material';

import { getValue } from '../../utils/properties';
import './icon.scss';

const types = {
  app: {},
  system: {
    'add-circle-outline': AddCircleOutline,
    'add-circle': AddCircle,
    Restore,
    LockOpen,
    DragHandle,
    Key,
    NotInterested,
    RestartAlt,
    AccessAlarms,
    AccessTime,
    AcUnit,
    AddToQueue,
    AddComment,
    AccountCircle,
    Save,
    SaveAs,
    LibraryAdd,
    PowerSettingsNew,
    Book,
    PHigh,
    PMedium,
    PUrgent: PriorityHigh,
    PLow,
    FileCopy,
    AddTask,
    AddToPhotos,
    Analytics,
    HideImage,
    Apps,
    Assistant,
    Build,
    BuildCircle,
    Cast,
    CastConnected,
    ChatBubbleOutline,
    ChatBubble,
    Chat,
    ChangeCircle,
    CheckCircleOutline,
    ClearAll,
    Comment,
    CommentsDisabled,
    ContactSupport,
    Contacts,
    DateRange,
    DoDisturbOn,
    DoNotDisturb,
    DownloadForOffline,
    EditAttributes,
    EditOff,
    ElectricBolt,
    Language,
    LightbulbCircle,
    Lightbulb,
    LightMode,
    Loyalty,
    Favorite,
    FavoriteBorder,
    FiberNew,
    Folder,
    FolderCopy,
    GppGood,
    GppMaybe,
    GppBad,
    Garage,
    MarkUnreadChatAlt,
    Shield,
    deactivate: Block,
    NoIcon: Article,
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
    groupwork: GroupWork,
    clear: Clear,
    person: Person,
    warning: WarningIcon,
    exit: ExitToApp,
    logout: LogoutIcon,
    error: ErrorIcon,
    more: MoreVertIcon,
    share: Share,
    erroroutline: ErrorOutline,
    calendar: CalendarMonth,
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
    arrowright: ArrowRight,
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
    edit: Edit,
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
    notification: Notifications,
    download: Download,
    dashboard: DashboardIcon,
    help: HelpIcon,
    Label,
    settings: SettingsApplications,
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
    link: Link,
    'sort-n': SortN,
    'sort-asc': SortAsc,
    'sort-desc': SortDesc,
  },
};

const list = () => {
  return {
    ...types.basic,
    ...types.system,
    ...types.app,
  };
};
const Icon = ({
  className = '',
  img,
  textIcon,
  name,
  variant = 'default',
  color,
  size = 'normal',
  iconClass = '',
  row,
  svg,
  onClick,
}) => {
  const finalName = getValue(this, name, row);
  const finalIconClass = getValue(this, iconClass, row);
  const finalColor = getValue(this, color, row);
  const finalVariant = getValue(this, variant, row);
  const IconToRender =
    list()[finalName] ||
    (textIcon ? undefined : !img ? list().NoIcon : undefined);
  return (
    <div
      className={`sq-icon ${finalIconClass} ${
        !finalName && textIcon ? 'sq-icon--text-icon' : ''
      } sq-icon--${finalVariant} ${finalColor ? `sq-icon--${finalColor}` : ''} sq-icon--${size} ${className}`}
      data-icon-name={finalName}
      onClick={onClick}
    >
      {!finalName && textIcon && (
        <span className="sq-icon__text">{getValue(this, textIcon, row)}</span>
      )}
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
  size: PropTypes.string,
};

export default Icon;

export const getIconList = (name) => {
  return types[name] || list();
};

export const registerIcon = (name, icon, group = 'app') => {
  if (types[group] && name && icon) {
    types[group][name] = icon;
  }
};
