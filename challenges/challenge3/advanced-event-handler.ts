type MyMap<T> = (data: T) => T;
type Filter<T> = (data: T) => boolean;
type Handler<T> = {
  [Property in keyof T as `map${Capitalize<string & Property>}`]?: MyMap<
    T[Property]
  >;
} & {
  [Property in keyof T as `filter${Capitalize<string & Property>}`]?: Filter<
    T[Property]
  >;
};
type ProcessedEvent<T> = {
  eventName: keyof T;
  data: T[keyof T];
};

class EventProcessor<T extends object> {
  private processed: ProcessedEvent<T>[] = [];
  private handlers: Handler<T>[] = [];

  handleEvent<K extends keyof T>(eventName: K, data: T[K]): void {
    let allowEvent = true;

    const capitalize = (s: string) =>
      `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

    for (const handler of this.handlers) {
      const filterFunc = handler[
        `filter${capitalize(<string>eventName)}` as keyof Handler<T>
      ] as unknown as ((value: T[K]) => boolean) | undefined;
      if (filterFunc && !filterFunc(data)) {
        allowEvent = false;
        break;
      }
      if (allowEvent) {
        let mappedData = { ...data };
        for (const handler of this.handlers) {
          const mapFunc = handler[
            `map${capitalize(<string>eventName)}` as keyof Handler<T>
          ] as unknown as ((value: T[K]) => T[K]) | undefined;
          if (mapFunc) {
            mappedData = <T[K]>mapFunc(mappedData);
          }
        }
        this.processed.push({
          eventName,
          data: mappedData,
        });
      }
    }
  }

  addHandler(handler: Handler<T>): void {
    this.handlers.push(handler);
  }

  getProcessedEvents() {
    return this.processed;
  }
}

interface EventMap {
  login: { user?: string; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProcessor extends EventProcessor<EventMap> {}

const uep = new UserEventProcessor();
uep.addHandler({
  filterLogin: ({ user }) => Boolean(user),
  mapLogin: (data) => ({
    ...data,
    hasSession: Boolean(data.user && data.name),
  }),
});

uep.handleEvent("login", {
  name: "jack",
});
uep.handleEvent("login", {
  user: "tom",
  name: "tomas",
});
uep.handleEvent("logout", {
  user: "tom",
});

console.log(uep.getProcessedEvents());

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
