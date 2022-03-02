// DateJS 公开的静态方法
interface DateConstructor {
  /** Gets a date that is set to the current date. The time is set to the start of the day (00:00 or 12:00 AM) */
  today(): Date
  // ... so on and so forth
}

// DateJS 公开的实例方法
interface Date {
  /** Adds the specified number of milliseconds to this instance. */
  addMilliseconds(milliseconds: number): Date
  // ... so on and so forth
}
Date.now()
