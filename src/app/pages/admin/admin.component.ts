import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { customDateValidator } from 'src/app/shared/service/validators/validateDate.service';
import * as NewCardActions from "../../store/new-card.actions";
import { INewCard } from 'src/app/shared/types/newCard';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  id: string = "";
  title: string = "";
  description: string = "";
  img: string = "";
  video: string = "";
  date: string = "";
  tags: string[] = [];

  inputs: string[] = [""];

  newCardData: INewCard = {
    id: this.id,
    title: this.title,
    descr: this.description,
    img: this.img,
    video: this.video,
    date: this.date,
    tags: this.tags
  };

  createCardForm = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    description: new FormControl("", Validators.maxLength(255)),
    img: new FormControl("", Validators.required),
    video: new FormControl("", Validators.required),
    date: new FormControl("", customDateValidator()),
  });

  createTags = this.fb.group({
    newTags: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private store: Store) { }

  createNewCard() {
    const newCard: INewCard = {
      id: this.id,
      title: this.title,
      descr: this.description,
      img: this.img,
      video: this.video,
      date: this.date,
      tags: this.tags,
    };

    this.store.dispatch(NewCardActions.addNewCard({ card: newCard }));
  }

  resetForm() {
    this.createCardForm.reset({
      title: "",
      description: "",
      img: "",
      video: "",
      date: "",
    }),
      this.createTags.reset({
        newTags: []
      })
  }

  addTag() {
    const tagsForm = this.fb.group({
      newTag: ["", Validators.minLength(1)]
    });

    if (this.inputs.length < 6) {
      this.newTags.push(tagsForm);
      this.inputs.push("");
      console.log(this.newTags.getRawValue());
    }
  }
  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  get newTags() {
    return this.createTags.controls["newTags"] as FormArray;
  }
}
