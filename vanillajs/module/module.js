import EventManager from '../utils/event-manager';
import $ from '../$';
class Module {
  constructor() {
    this.$ = $;
    this.events = new EventManager();
  }
}

export default Module;
