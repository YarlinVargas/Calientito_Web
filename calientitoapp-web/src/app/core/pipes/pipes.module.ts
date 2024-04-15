import { NgModule } from "@angular/core";
import { SafePipe } from "./safe/safe.pipe";
import { CommonModule } from "@angular/common";
import { ShortTextPipe } from "./short/short-text.pipe";
import { FilterUsersPipe } from './filter/filter-users.pipe';
import { FilterRequerimentsPipe } from "./filter/filter-requirenments.pipe";
import { FilterClientsPipe } from "./filter/filter-clients.pipe";
import { FilterProductoPipe } from "./filter/filter_product.pipe";

@NgModule({
  providers: [
    FilterUsersPipe,
    FilterRequerimentsPipe,
    FilterClientsPipe,
    FilterProductoPipe
  ],
  declarations: [
    SafePipe,
    ShortTextPipe,
    FilterUsersPipe,
    FilterRequerimentsPipe,
    FilterClientsPipe,
    FilterProductoPipe
  ],
  imports: [CommonModule],
  exports: [
    SafePipe,
    ShortTextPipe,
    FilterUsersPipe,
    FilterRequerimentsPipe,
    FilterClientsPipe,
    FilterProductoPipe
  ]
})
export class PipesModule { }
