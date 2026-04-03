import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Book } from "app/projects/book-list/models/book-model";

@Component ({
    selector: 'app-delete-confirm',
    templateUrl: './delete-confirm.html',
    styleUrl: './delete-confirm.scss',
    imports: []
})

export class DeleteConfirmComponent {
    @Input({required: true}) book: Book = new Book();
    @Output() public closeDeleteEvent = new EventEmitter<void>()
    @Output() public confirmDeleteEvent = new EventEmitter<void>()

    onCancel() {
      this.closeDeleteEvent.emit()
    }

    onConfirm() {
      this.confirmDeleteEvent.emit()
    }
}