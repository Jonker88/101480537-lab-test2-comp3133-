import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../models/character.model';
import { HarryPotterApiService } from '../../services/harry-potter-api.service';

@Component({
  selector: 'app-characterdetails',
  templateUrl: './characterdetails.component.html',
  styleUrl: './characterdetails.component.css',
  standalone: false
})
export class CharacterdetailsComponent implements OnInit {
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly character = signal<Character | null>(null);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly apiService: HarryPotterApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage.set('Character id is missing.');
      return;
    }

    this.loading.set(true);
    this.apiService.getCharacterById(id).subscribe({
      next: (data) => {
        this.character.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Could not load character details.');
        this.loading.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }

  getHouseLabel(): string {
    const house = this.character()?.house;
    return house && house.trim() ? house : 'No House';
  }

  getHouseClass(): string {
    const house = this.getHouseLabel();
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
}
