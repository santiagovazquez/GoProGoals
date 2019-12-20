class Logger {
  constructor() {
    this.logs = [];
    this._listeners = [];
  }

  addLog(log) {
    this.logs.push(log);
    this._listeners.forEach(l => l(this.logs))
  }



  onLogsChange(fn) {
    this._listeners.push(fn);
  }
}

export default new Logger();