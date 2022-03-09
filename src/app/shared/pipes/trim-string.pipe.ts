import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'trimString' })
export class TrimStringPipe implements PipeTransform {
  transform(text: string) {
    const trimedString = text.replace(" ", '').toLowerCase();
    return trimedString;
  }
}