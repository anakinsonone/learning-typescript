type Handler<T> = {
  [Property in keyof T as `map${Capitalize<string & Property>}`]?: (data: T[Property]) => T[Property];
} & {
    [Property in keyof T as `filter${Capitalize<string & Property>}`]?: (data: T[Property]) => boolean;
  }
type ProcessedEvent<T> = {
  eventName: keyof T,
  data: T[keyof T],
}

class EventProcessor<T extends object> {
  private processed: ProcessedEvent<T>[] = [];
  handleEvent(eventName: ..., data: ...): void {
  }

  addHandler(handler: Handler<T>): void {
  }

  getProcessedEvents(): ...[] {
}
}

interface EventMap {
  login: { user?: string; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProcessor extends EventProcessor<EventMap> { }

const uep = new UserEventProcessor();
uep.addHandler({
  filterLogin: ({ user }) => Boolean(user),
  mapLogin: (data) => ({
    ...data,
    hasSession: Boolean(data.user && data.name),
  }),
});

uep.handleEvent("login", {
  user: null,
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
