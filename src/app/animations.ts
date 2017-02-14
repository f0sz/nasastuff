import {AnimationEntryMetadata, trigger, transition, animate, style} from "@angular/core";

export const fadeOut: AnimationEntryMetadata =
  trigger('routeAnimation', [
    transition(':leave', animate('300ms ease-out',
      style({
        opacity: 0
      })
    )),
  ]);
