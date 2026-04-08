import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, computed, signal } from '@angular/core';
import { Character } from '../../models/character.model';
import { HarryPotterApiService } from '../../services/harry-potter-api.service';

@Component({
  selector: 'app-characterlist',
  templateUrl: './characterlist.component.html',
  styleUrl: './characterlist.component.css',
  standalone: false
})
export class CharacterlistComponent implements OnInit, AfterViewInit {
  @ViewChildren('characterCard') cardRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly characters = signal<Character[]>([]);
  readonly searchText = signal('');
  private observer?: IntersectionObserver;

  readonly filteredCharacters = computed(() => {
    const query = this.searchText().toLowerCase().trim();
    return this.characters().filter((character) => {
      const name = (character.name || '').toLowerCase();
      return name.includes(query);
    });
  });

  constructor(private readonly apiService: HarryPotterApiService) {}

  ngOnInit(): void {
    this.loadAllCharacters();
  }

  ngAfterViewInit(): void {
    this.cardRefs.changes.subscribe(() => this.observeCards());
    this.observeCards();
  }

  onHouseSelected(house: string): void {
    if (house === 'all') {
      this.loadAllCharacters();
      return;
    }

    if (house === 'No House') {
      this.loadAllCharacters(true);
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.apiService.getCharactersByHouse(house).subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Could not load characters for selected house.');
        this.loading.set(false);
      }
    });
  }

  onSearchChange(value: string): void {
    this.searchText.set(value);
  }

  getHouseLabel(character: Character): string {
    return character.house && character.house.trim() ? character.house : 'No House';
  }

  getHouseClass(character: Character): string {
    const house = this.getHouseLabel(character);
    switch (house) {
      case 'Gryffindor':
        return 'house-gryffindor';
      case 'Slytherin':
        return 'house-slytherin';
      case 'Ravenclaw':
        return 'house-ravenclaw';
      case 'Hufflepuff':
        return 'house-hufflepuff';
      default:
        return 'house-none';
    }
  }

  private loadAllCharacters(onlyNoHouse = false): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.apiService.getCharacters().subscribe({
      next: (data) => {
        const list = onlyNoHouse ? data.filter((c) => !c.house || c.house.trim() === '') : data;
        this.characters.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Could not load character list from API.');
        this.loading.set(false);
      }
    });
  }

  private observeCards(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    if (!this.observer) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              this.observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
    }

    this.cardRefs.forEach((cardRef) => {
      const card = cardRef.nativeElement;
      card.classList.remove('visible');
      this.observer?.observe(card);
    });
  }
}
