export default class Keyboard {
  public static readonly state: Map<string, boolean> = new Map();
  public static pressed: boolean = false;
  public static initialize() {
    // The `.bind(this)` here isn't necesary as these functions won't use `this`!
    document.addEventListener("keydown", Keyboard.keyDown);
    document.addEventListener("keyup", Keyboard.keyUp);
  }
  private static keyDown(e: KeyboardEvent): void {
    Keyboard.state.set(e.code, true)
    Keyboard.pressed = true;
  }
  private static keyUp(e: KeyboardEvent): void {
    Keyboard.state.set(e.code, false)
    Keyboard.pressed = false;
  }
  static action(): boolean {
    return Keyboard.state.get("Space") || Keyboard.state.get("Enter");
  }
}
