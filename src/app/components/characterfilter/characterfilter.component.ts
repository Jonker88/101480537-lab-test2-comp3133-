import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-characterfilter',
  templateUrl: './characterfilter.component.html',
  styleUrl: './characterfilter.component.css',
  standalone: false
})
export class CharacterfilterComponent {
  @Output() houseSelected = new EventEmitter<string>();

  selectedHouse = 'all';
  readonly houses = [
    { value: 'all', label: 'All', icon: '✨' },
    { value: 'Gryffindor', label: 'Gryffindor', icon: '🦁' },
    { value: 'Slytherin', label: 'Slytherin', icon: '🐍' },
    { value: 'Ravenclaw', label: 'Ravenclaw', icon: '🦅' },
    { value: 'Hufflepuff', label: 'Hufflepuff', icon: '🦡' },
    { value: 'No House', label: 'No House', icon: '🪄' }
  ];

  onHouseChange(value: string): void {
    this.selectedHouse = value;
    this.houseSelected.emit(value);
  }
}
