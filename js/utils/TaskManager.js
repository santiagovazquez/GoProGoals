import Logger from './Logger';

class Task {
  constructor(name, promise) {
    this.name = name;
    this.promise = promise;
  }

  run() {
    return this.promise();
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];

    this.run = this.run.bind(this);
    this.scheduleTask = this.scheduleTask.bind(this);
  }

  run() {
    if (this.tasks.length === 0) {
      return;
    }

    const currentTask = this.tasks.shift();
    Logger.addLog(`Running: ${currentTask.name}`);

    currentTask
      .run()
      .then(() => {
        Logger.addLog(`Finished: ${currentTask.name}`);
        this.run();
      })
      .catch(e => {
        Logger.addLog(`Error running ${currentTask.name}: ${e}`);
      });
  }

  scheduleTask(name, promise) {
    this.tasks.push(new Task(name, promise));
    this.run();
  }
}

export default new TaskManager();