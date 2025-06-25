// ai-chat-ghpages/src/services/audioService.ts
import { Howl } from "howler";

class AudioService {
  private musicVolume: number;
  private music: Howl | null;

  constructor() {
    this.musicVolume = 0.5;
    this.music = null;
  }

  playMusic(path: string): void {
    if (this.music) {
      this.music.stop();
    }

    this.music = new Howl({ src: [path], loop: true, volume: this.musicVolume });
    this.music.play();
  }

  stopMusic(): void {
    if (this.music) {
      this.music.stop();
      this.music = null;
    }
  }
}

export const audioService = new AudioService();