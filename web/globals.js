import { GlobalOptions } from '../server/src/utils/global-options';
export const CONSTANTS = {
  STATUS: {
    SUCCESS: 'success',
    ERROR: 'error',
    OK: 'ok',
  },
  contentType: {
    PAGE: 'PAGE',
    SITE_MAP: 'SITE_MAP',
  },
};

export const GLOBAL_OPTIONS = {
  inputVariant: new GlobalOptions({
    outlined: 'Outlined',
    standard: 'Standard',
    filled: 'Filled',
    default: 'Default',
  }),
  userTabs: new GlobalOptions({
    ALL_USERS: 'All Users',
    ACTIVE_USERS: 'Active Users',
    INACTIVE_USERS: 'Inactive Users',
  }),
  roleTabs: new GlobalOptions({
    ALL_ROLES: 'All Roles',
  }),
  roleType: new GlobalOptions({
    INTERNAL: 'Internal',
    EXTERNAL: 'External',
  }),
  alerTypes: new GlobalOptions({
    info: 'Info',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
  }),
  permissionTypes: new GlobalOptions({
    PERMISSIONS: {
      text: 'Permissions',
      key: 'permission',
    },
    LEFT_NAVIGATION: {
      text: 'Left Navigation',
      key: 'navigation',
    },
    ASSIGN_USERS: {
      text: 'Assign Users',
    },
  }),
  contentType: new GlobalOptions({
    PAGE: 'Page',
    SITE_MAP: 'Site Map',
  }),
  noOfResultsDropdown: new GlobalOptions({
    25: 25,
    50: 50,
    100: 100,
  }),
  progressTypes: new GlobalOptions({
    default: 'default',
    circle: 'circle',
    cube: 'cube',
    round: 'round',
    ripple: 'ripple',
  }),
  progressStyles: new GlobalOptions({
    'full-screen': 'full-screen',
  }),
  maskTypes: new GlobalOptions({
    phone: 'phone',
    number: 'number',
    currency: 'currency',
    percentage: 'percentage',
    appendText: 'appendText',
    titleCase: 'titleCase',
    upperCase: 'upperCase',
    lowerCase: 'lowerCase',
    appendViewOnlyText: 'appendViewOnlyText',
  }),
  compareOperators: new GlobalOptions({
    bool: 'bool type equals',
    '=': '= equals',
    '!=': '!= not equals',
  }),
  headerTags: new GlobalOptions({
    h1: 'H1',
    h2: 'H2',
    h3: 'H3',
    h4: 'H4',
    h5: 'H5',
    h6: 'H6',
  }),
  bodyContainers: new GlobalOptions({
    'body-container-small': 'body-container-small',
    'body-container-med': 'body-container-med',
    'body-container-lg': 'body-container-lg',
    'body-container-xl': 'body-container-xl',
  }),
  linkTypes: new GlobalOptions({
    Button: 'Button',
    LinkButton: 'LinkButton',
  }),
  variants: new GlobalOptions({
    contained: 'Contained',
    outlined: 'Outlined',
    default: 'Default',
  }),
  pageWrapperClasses: new GlobalOptions({
    'sq-content-page--full-width': 'sq-content-page--full-width',
    'sq-content-page--header-footer-body': 'sq-content-page--header-footer-body',
  }),
  buttonSize: new GlobalOptions({
    small: 'small',
    medium: 'medium',
    large: 'large',
  }),
  colorTypes: new GlobalOptions({
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    info: 'info',
    error: 'error',
    warning: 'warning',
  }),
  radioDisplay: new GlobalOptions({
    Column: 'Column',
    Inline: 'Inline',
  }),
  headerStyles: new GlobalOptions({
    'sq-header--center': 'sq-header--center',
    'sq-header--left': 'sq-header--left',
    'mb-narrow': 'Margin bottom narrow',
    'mb-wide': 'Margin bottom wide',
    'mb-none': 'Margin bottom none',
  }),
  heroStyles: new GlobalOptions({
    'sq-hero-content--left-aligned': 'sq-hero-content--left-aligned',
    'sq-hero-content--large-background-theme-dark': 'sq-hero-content--large-background-theme-dark',
    'sq-hero-content--bg-black': 'sq-hero-content--bg-black',
    'sq-hero-content--bg-gray': 'sq-hero-content--bg-gray',
    'sq-hero-content--dark': 'sq-hero-content--dark',
    'sq-hero-content--full-width': 'sq-hero-content--full-width',
    'sq-hero-content--dark-secondary': 'sq-hero-content--dark-secondary',
  }),
  heroTemplates: new GlobalOptions({
    'without-image': 'without-image',
    default: 'default',
    'with-background': 'with-background',
    'large-background': 'large-background',
  }),
  formStyles: new GlobalOptions({
    'sq-form--2-cols': '2 Columns',
    'sq-form--3-cols': '3 Columns',
    'sq-form--inline-auto': 'Inline Auto',
    'sq-form--narrow-space': 'Narrow Space',
    'pb-0': 'No Padding bottom',
  }),

  genericStyles: new GlobalOptions({
    'mb-wide': 'Margin bottom wide',
    'mt-wide': 'Margin top wide',
    'mb-jumbo': 'Margin bottom jumbo',
    'mt-jumbo': 'Margin top jumbo',
    'mb-none': 'Margin bottom none',
    'mt-none': 'Margin top none',
    'pb-wide': 'Padding bottom wide',
    'pt-wide': 'Padding top wide',
    'pb-0': 'Padding bottom none',
    'pt-none': 'Padding top none',
    'pb-jumbo': 'Padding bottom jumbo',
    'pt-jumbo': 'Padding top jumbo',
    'text-center': 'text-center',
  }),

  htmlTags: new GlobalOptions({
    span: 'span',
    div: 'div',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    p: 'p',
  }),
  actionTypes: new GlobalOptions({
    submit: 'submit',
    api: 'api',
    module: 'module',
    redirect: 'redirect',
  }),
  methodTypes: new GlobalOptions({
    get: 'GET',
    post: 'POST',
    patch: 'PATCH',
    update: 'UPDATE',
    delete: 'DELETE',
  }),
  salutation: new GlobalOptions({
    'Mr.': 'Mr.',
    'Mrs.': 'Mrs.',
    'Miss.': 'Miss',
  }),
};
export { GlobalOptions };
