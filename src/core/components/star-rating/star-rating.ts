import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Book } from 'app/projects/book-list/models/book-model';
import { FilledStarIconComponent } from 'core/UI/icons/filled-star/filled-star.component';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
  imports: [FilledStarIconComponent],
})
export class StarRatingComponent implements OnChanges {
  @Input({ required: true }) book!: Book | null;
  @Output() public updateRatingEvent = new EventEmitter<{ book: Book; rating: number }>();
  @Output() public newBookRatingEvent = new EventEmitter<number>();

  public readonly star = signal(0);

  ngOnChanges() {
    this.star.set(this.book?.rating ?? 0);
  }

  updateRating(book: Book | null, rating: number) {
    this.star.set(rating);
    if (book) {
      this.updateRatingEvent.emit({ book, rating });
    } else {
      this.newBookRatingEvent.emit(rating);
    }
  }
}
