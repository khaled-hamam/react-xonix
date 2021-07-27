import EventEmitter from "events";

type Events = 'LOSE_LIFE' | 'FILL_GRID';

export interface EventsManager {
  on: (event: Events, listener: () => void) => this
  emit: (event: Events) => boolean
}

export class EventsManager extends EventEmitter {
  private static _instance: EventsManager;

  private constructor() {
    super();
  }

  public static get instance(): EventsManager {
    if (EventsManager._instance === undefined) {
      EventsManager._instance = new EventsManager();
    }

    return EventsManager._instance;
  }
}