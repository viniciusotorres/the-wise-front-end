import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../core/auth/auth-service.service';
import { PlayerService } from '../../../core/services/player/player.service';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

/**
 * Component for displaying the toolbar profile.
 */
@Component({
  selector: 'app-toolbar-profile',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './toolbar-profile.component.html',
  styleUrls: ['./toolbar-profile.component.scss']
})
export class ToolbarProfileComponent implements OnInit {
  userData: any;
  progressPercentage: number = 0;

  ranks = [
    { name: 'Bronze', image: 'https://static.vecteezy.com/system/resources/previews/024/281/515/non_2x/bronze-trophy-cup-free-png.png' },
    { name: 'Silver', image: 'https://static.vecteezy.com/system/resources/previews/024/281/518/original/silver-trophy-cup-free-png.png' },
    { name: 'Gold', image: 'https://static.vecteezy.com/system/resources/previews/019/008/706/original/gold-trophy-award-png.png' },
    { name: 'Platinum', image: 'https://images.vexels.com/content/196898/preview/purple-crystal-awesome-f26c94.png' },
    { name: 'Diamond', image: 'https://images.vexels.com/media/users/3/151592/isolated/preview/e569daad3a4a44c478281bbf95a50a2b-icone-plano-de-diamante-azul.png' },
    { name: 'Master', image: 'https://i.pinimg.com/originals/c7/ff/71/c7ff7112fdb9138ddbb6990a24223826.png' },
    { name: 'Grandmaster', image: 'https://cdn-icons-png.flaticon.com/512/1092/1092254.png' },
    { name: 'Challenger', image: 'https://png.pngtree.com/png-vector/20220715/ourmid/pngtree-spartan-warrior-helmet-png-image_5968794.png' },
    { name: 'Legend', image: 'https://cdn.pixabay.com/photo/2024/04/02/09/40/greek-8670466_1280.png' }
  ];

  /**
   * Constructor for ToolbarProfileComponent.
   * @param {AuthServiceService} authService - The authentication service.
   * @param {PlayerService} playerService - The player service.
   */
  constructor(private authService: AuthServiceService, private playerService: PlayerService) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
      const userId = this.authService.getUserId();
      if (userId) {
        this.playerService.getPlayer(userId).subscribe(
          (data: any) => {
            this.userData = data;
            this.calculateProgress();
            console.log(this.userData);
          },
          (error) => {
            console.error('Erro ao obter dados do jogador:', error);
          }
        );
      }
    
  }

  /**
   * Calculates the progress percentage for the user's level.
   */
  calculateProgress(): void {
    if (this.userData.xp && this.userData.nextLevel) {
      const totalXp = this.userData.xp + this.userData.nextLevel;
      this.progressPercentage = Math.min((this.userData.xp / totalXp) * 100, 100);
    }
  }

  /**
   * Gets the image URL for the user's rank.
   * @returns {string} - The image URL for the user's rank.
   */
  getRankImage(): string {
    const rank = this.ranks.find(r => r.name === this.userData.rank);
    return rank ? rank.image : '';
  }

  /**
   * Logs out the user.
   */
  logout(): void {
    this.authService.logout();
  }

  /**
   * Checks if the user is logged in.
   * @returns {boolean} - True if the user is logged in, false otherwise.
   */
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}