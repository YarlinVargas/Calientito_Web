export class TextLargeWindow {

  public static get(mob: number = 10, sm: number = 20, lg: number = 30, xl = 40): number {
    if (window.innerWidth >= 425 && window.innerWidth < 768)
      return sm;
    else if(window.innerWidth >= 768 && window.innerWidth < 1280)
      return lg;
    else if(window.innerWidth >= 1280)
      return xl;
    else
      return mob;
  }
}