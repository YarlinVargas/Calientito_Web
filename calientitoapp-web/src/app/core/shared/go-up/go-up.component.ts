import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { IconDefinition, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-go-up',
  templateUrl: './go-up.component.html',
  styleUrls: ['./go-up.component.scss']
})
export class GoUpComponent implements OnInit, OnDestroy {

  public iconUp: IconDefinition = faAngleUp;
  public isMobile: boolean = false;
  public destroy$ = new Subject<void>();

  private breakpointObserver = inject(BreakpointObserver);

  @Input({ required: true })
  public elementToTop!: HTMLElement;

  @ViewChild('upButton')
  upButton!: ElementRef;

  public ngOnInit(): void {
    this.breakpointObserver.observe(['(min-width: 768px)'])
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((result: BreakpointState) =>
        this.isMobile = !result.matches
      )
  }

  public ngAfterViewInit() {
    if (!this.elementToTop) return;

    this.elementToTop.onscroll = () => {
      const currentScroll = this.elementToTop.scrollTop;

      this.upButton.nativeElement.style.transform = currentScroll > 200 ?
        'scale(1)' : 'scale(0)';
    }
  }

  public scrollToTop() {
    if (!this.elementToTop) return;

    const currentScroll = this.elementToTop.scrollTop;

    if (currentScroll > 0) {
      window.requestAnimationFrame(() => this.scrollToTop());
      this.elementToTop.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
