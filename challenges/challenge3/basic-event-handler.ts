type BasicFilterFunctions<T> = (data: T[keyof T]) => boolean;
type BasicFilters<T> = Record<keyof T, BasicFilterFunctions<T>[]>;
type BasicMapFunctions<T> = (data: T[keyof T]) => T[keyof T];
type BasicMaps<T> = Record<keyof T, BasicMapFunctions<T>[]>;
type BasicProcessedEvent<T> = {
  eventName: keyof T;
  data: T[keyof T];
};

class EventProcessor<T extends object> {
  private filters: BasicFilters<T> = <BasicFilters<T>>{};
  private maps: BasicMaps<T> = <BasicMaps<T>>{};
  private processed: BasicProcessedEvent<T>[] = [];

  handleEvent<K extends keyof T>(eventName: K, data: T[K]): void {
    let allowEvent = true;
    for (const filter of this.filters[eventName] ?? []) {
      if (!filter(data)) {
        allowEvent = false;
        break;
      }
    }
    if (allowEvent) {
      let mappedData = { ...data };
      for (const map of this.maps[eventName] ?? []) {
        mappedData = <T[K]>map(mappedData);
      }
      this.processed.push({
        eventName,
        data: mappedData,
      });
    }
  }

  addFilter<K extends keyof T>(
    eventName: K,
    filter: (data: T[K]) => boolean,
  ): void {
    this.filters[<keyof T>eventName] ||= [];
    this.filters[<keyof T>eventName].push(filter as BasicFilterFunctions<T>);
  }

  addMap<K extends keyof T>(eventName: K, map: (data: T[K]) => T[K]): void {
    this.maps[<keyof T>eventName] ||= [];
    this.maps[<keyof T>eventName].push(map as unknown as BasicMapFunctions<T>);
  }

  getBasicProcessedEvents() {
    return this.processed;
  }
}

interface BasicEventMap {
  login: { user?: string; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class BasicUserEventProcessor extends EventProcessor<BasicEventMap> {}

const buep = new BasicUserEventProcessor();

buep.addFilter("login", ({ user }) => Boolean(user));

buep.addMap("login", (data) => ({
  ...data,
  hasSession: Boolean(data.user && data.name),
}));

buep.handleEvent("login", {
  name: "jack",
});
buep.handleEvent("login", {
  user: "tom",
  name: "tomas",
});
buep.handleEvent("logout", {
  user: "tom",
});

console.log(buep.getBasicProcessedEvents());

/*
Result:
[
  {
    eventName: 'login',
    data: { user: 'tom', name: 'tomas', hasSession: true }
  },
  { eventName: 'logout', data: { user: 'tom' } }
]
*/
