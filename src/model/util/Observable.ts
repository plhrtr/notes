/**
 * Base class that provides property subscription and connection to signals of the class.
 * @template Properties Type that contains all properties of the extending class that are subscribable.
 * @template Signals Type with all signal names of the extending class.
 */
export class Observable<
  Properties extends { [key: string]: any } = any,
  Signals extends string = string,
> {
  protected _propertySubscribers: {
    [K in keyof Properties]?: Set<(newValue: Properties[K]) => void>;
  } = {};
  protected _signalSubscribers: Map<Signals, Set<() => void>> = new Map();

  /**
   * Create a new observable instance.
   * Wraps the extending class with a proxy to provide subscription functionality.
   */
  constructor() {
    // Wrap the object with a proxy to notify subscribers of value changes
    return new Proxy(this, {
      set: (target: this, property: string | symbol, value: any): boolean => {
        const success = Reflect.set(target, property, value);

        if (
          success &&
          Object.prototype.hasOwnProperty.call(
            this._propertySubscribers,
            property,
          )
        ) {
          const callbacks =
            this._propertySubscribers[property as keyof Properties];
          if (callbacks) {
            callbacks.forEach((callback) => {
              callback(value);
            });
          }
        }

        return success;
      },
    });
  }

  /**
   * Subscribe to changes of the given property.
   * @param propertyName The name of the property you want to subscribe to.
   * @param callback The callback function that is called when the property changes.
   * @returns Function to unsubscribe from future changes.
   */
  subscribe<K extends keyof Properties>(
    propertyName: K,
    callback: (newValue: Properties[K]) => void,
  ): () => void {
    if (!this._propertySubscribers[propertyName]) {
      this._propertySubscribers[propertyName] = new Set();
    }

    const callbacks = this._propertySubscribers[propertyName]!;
    callbacks.add(callback);

    return () => {
      callbacks.delete(callback);
    };
  }

  /**
   * Registers a callback to be executed when a named event is emitted.
   * @param signalName The name of the signal you want to connect to.
   * @param callback Callback that is executed when the signal is notified.
   * @returns A function to stop listening for future signals.
   */
  connect(signalName: Signals, callback: () => void): () => void {
    if (!this._signalSubscribers.has(signalName)) {
      this._signalSubscribers.set(signalName, new Set());
    }

    const listeners = this._signalSubscribers.get(signalName)!;
    listeners.add(callback);

    return () => {
      listeners.delete(callback);
    };
  }

  /**
   * Notifies all who are connect that the signal got called.
   * @param signalName - The name of the signal you want to call.
   */
  notify(signalName: Signals): void {
    if (this._signalSubscribers.has(signalName)) {
      this._signalSubscribers.get(signalName)!.forEach((listener) => {
        listener();
      });
    }
  }
}
