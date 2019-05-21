import {MatPaginatorIntl} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

export class MyMatPaginatorIntl extends MatPaginatorIntl {
  _intl;
  constructor() {
    super();
  }

  getPaginatorIntl() {
    this.itemsPerPageLabel = 'Nombre d\'element affichés.';
    this.nextPageLabel = 'Nombre d\'element affichés.';
    this.previousPageLabel = 'Nombre d\'element affichés.';
    this.firstPageLabel = 'Nombre d\'element affichés.';
    this.lastPageLabel = 'Nombre d\'element affichés.';
    this.getRangeLabel = this.getRangeLabel.bind(this);
  }

  static getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return '0 a ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return startIndex + ' - ' + endIndex + ' de ' + length;
  }
}
