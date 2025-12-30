// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// Timer state enum
enum TimerState {
  Stopped,
  Running,
}

// Timer class to manage the timer logic
class Timer {
  private _state: TimerState = TimerState.Stopped;
  private _elapsedTime: number = 0; // in milliseconds
  private _timerId: NodeJS.Timeout | undefined;
  private _statusBarItem: vscode.StatusBarItem;

  constructor() {
    // Create status bar item
    this._statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );
    this._statusBarItem.text = "00";
    this._statusBarItem.tooltip = "Click to start timer";
    this._statusBarItem.command = "little-clock.toggleTimer";
    this._statusBarItem.show();
  }

  // Start the timer
  public start(): void {
    if (this._state === TimerState.Running) {
      return;
    }

    this._state = TimerState.Running;
    this._statusBarItem.tooltip = "Click to stop timer";

    const startTime = Date.now() - this._elapsedTime;

    this._timerId = setInterval(() => {
      this._elapsedTime = Date.now() - startTime;
      this.updateDisplay();
    }, 1000);
  }

  // Stop the timer
  public stop(): void {
    if (this._state === TimerState.Stopped) {
      return;
    }

    this._state = TimerState.Stopped;
    this._statusBarItem.tooltip = "Click to start timer";

    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = undefined;
    }
  }

  // Reset the timer
  public reset(): void {
    this.stop();
    this._elapsedTime = 0;
    this.updateDisplay();
  }

  // Toggle timer state
  public toggle(): void {
    if (this._state === TimerState.Running) {
      this.stop();
    } else {
      if (this._elapsedTime === 0) {
        this.start();
      } else {
        // If timer is stopped and has elapsed time, reset it
        this.reset();
      }
    }
  }

  // Update the status bar display
  private updateDisplay(): void {
    const hours = Math.floor(this._elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor(
      (this._elapsedTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((this._elapsedTime % (1000 * 60)) / 1000);

    let displayText: string;
    
    if (hours > 0) {
      // Format: HH:MM:SS
      displayText = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else if (minutes > 0) {
      // Format: MM:SS
      displayText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      // Format: SS
      displayText = `${seconds.toString().padStart(2, "0")}`;
    }

    this._statusBarItem.text = displayText;
  }

  // Dispose the timer and status bar item
  public dispose(): void {
    this.stop();
    this._statusBarItem.dispose();
  }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "little-clock" is now active!');

  // Create timer instance
  const timer = new Timer();

  // Register toggle timer command
  const disposable = vscode.commands.registerCommand(
    "little-clock.toggleTimer",
    () => {
      timer.toggle();
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push({ dispose: () => timer.dispose() });
}

// This method is called when your extension is deactivated
export function deactivate() {}
